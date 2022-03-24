var Song = require('../models/song');

function handleError(error){
  console.log("[ERROR] - " + error.message);
}

const permitted_params = ["name"]

function params(arr1){

  let ret = [];
  for(var i in permitted_params) {
    if(arr1.indexOf(permitted_params[i]) > -1){
      ret.push(permitted_params[i]);
    }
  }
  return ret;
}

function prepare_song_data_with_params(song_params){
  let keys = params(Object.keys(song_params))
  let song_data = {}
  keys.forEach((key, i) => {
    song_data[key] = song_params[key]
  });

  return song_data;
}

exports.index = function(req, res) {
  Song.find({}, function(err, songs) {
    res.json({code: 200, songs: songs});
  });
};

exports.show = function(req, res){
  Song.findById(req.params.id, function(err, song){
    if (err) return handleError(err);
    res.json({code: 200, song: song});
  });
}

exports.create = function(req, res) {
  let song_data = prepare_song_data_with_params(req.body.song)
  let song = new Song(song_data);

  song.save(function (err) {
    if (err) return handleError(err);
    res.json({code: 200, id: song._id});
  });

}

exports.update = function(req, res) {
  let song_data = prepare_song_data_with_params(req.body.song)

  Song.findByIdAndUpdate(req.params.id, song_data, function (err, song) {
    if (err) return handleError(err);
    res.json({code: 200, id: song._id});
  });

}

exports.destroy = function(req, res){
  Song.findByIdAndRemove(req.params.id, function(err){
    if (err) return handleError(err)
    res.json({code: 200})
  })
}
