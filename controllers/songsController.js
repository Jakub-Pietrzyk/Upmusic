var Song = require('../models/song');

exports.index = function(req, res) {

  Song.find({}, function(err, songs) {
    // res.render('/usersList', {users: users});
    res.json({code: 200, songs: songs});
  });


};
