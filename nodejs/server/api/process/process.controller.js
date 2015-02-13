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
      var hasD = durString.indexOf('D') !== -1;
      var hasH = durString.indexOf('H') !== -1;
      var hasM = durString.indexOf('M') !== -1;
      var hasS = durString.indexOf('S') !== -1;
      var durSeconds = 0;
      
      if (hasD) {
        durSeconds += parseFloat(durString.substring(durString.indexOf('P')+1, durString.indexOf('D')) * 60 * 60 * 24);
      }
      
      if (hasH) {
        durSeconds += parseFloat(durString.substring(durString.indexOf('T')+1, durString.indexOf('H')) * 60 * 60);
      }
      
      if (hasM) {
        if (hasH) {
          durSeconds += parseFloat(durString.substring(durString.indexOf('H')+1, durString.indexOf('M')) * 60);
        }
        else {
          durSeconds += parseFloat(durString.substring(durString.indexOf('T')+1, durString.indexOf('M')) * 60);
        }
      }
      
      if (hasS) {
        if (hasM) {
          durSeconds += parseFloat(durString.substring(durString.indexOf('M')+1, durString.indexOf('S')));
        }
        else if (hasH) {
          durSeconds += parseFloat(durString.substring(durString.indexOf('H')+1, durString.indexOf('S')));
        }
        else {
          durSeconds += parseFloat(durString.substring(durString.indexOf('T')+1, durString.indexOf('S')));
        }
      }
      
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
        'pastDate': past.format(),
        'pastMS': past.valueOf(),
        'ad': true,
        'bc': false
      });
    }
    else {
      res.json(err);
    }
  });
};