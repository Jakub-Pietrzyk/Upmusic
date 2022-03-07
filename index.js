const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressWinston = require('express-winston');
const winston = require('winston');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

const mongoDB = 'mongodb://127.0.0.1/upmusic';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const displayObject = function(obj){
  let final = "{"
  for(key in obj) {
    final += key + ": " + obj[key] + ", ";
  }
  final = final.slice(0,-2)
  return final += "}"
}


app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize({
      all: true
    }),
    winston.format.label({
      label: "LOG"
    }),
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.printf(function(info){
      return `${info.label} [${info.level}]: ${[info.timestamp]}: ${info.message}\nquery: ${displayObject(info.meta.req.query)}\nres: ${displayObject(info.meta.res)}, responseTime: ${info.meta.responseTime}\n`
    })
  )
}));


const songsRouter = require('./routes/songs');
app.use('/songs', songsRouter);


app.use(expressWinston.errorLogger({
  transports: [ new winston.transports.Console() ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

app.listen(port, () => console.log(`Server listening on port ${port}\n`));
