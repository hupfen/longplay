'use strict';

var _ = require('lodash');

var Youtube = require("youtube-api");
var moment = require('moment');
 
Youtube.authenticate({
    type: "key"
  , key: "AIzaSyD7qajKcQxfeWMT4nq3y-e1eIlOAOvKCEg"
});

// Get list of things
exports.index = function(req, res) {
  var video = req.query.id;
  Youtube.videos.list({
    "part": "contentDetails, statistics, player, snippet"
  , "id": video
  }, function (err, data) {
    if (data) {
      var result = data.items[0];
      var durString = result.contentDetails.duration;
      var views = parseFloat(result.statistics.viewCount);

      var durSeconds = (parseFloat(durString.substring(2, durString.indexOf('M'))) * 60) + (parseFloat(durString.substring(durString.indexOf('M')+1, durString.indexOf('S'))));
      var playMinutes = ((durSeconds * views) / 60);

      var now = moment();
      var past = now.subtract(playMinutes, 'minutes');

      res.json({
        'playedLength': playMinutes,
        'id': video,
        'name': result.snippet.title,
        'length': durSeconds,
        'views': views,
        'uploader': result.snippet.channelTitle,
        'pastDate': past
      });
    }
    else {
      res.json(err);
    }
  });
  
  //.substring(2, test.indexOf('M')) (minutes)
  //.substring(test.indexOf('M')+1, test.indexOf('S'))

};