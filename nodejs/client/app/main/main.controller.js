'use strict';

angular.module('nodejsApp')
  .controller('MainCtrl', function ($scope, $http, $sce, Blurb) {
    $scope.url = '';
    $scope.error;
    $scope.processing = false;
    $scope.video = {};
  
    $scope.process = function () {
      $scope.error = null;
      $scope.processing = true;
      var videoID = '';
      var url = $scope.url;
      if (url.indexOf('youtube') !== -1) {
        videoID = url.substr(url.indexOf('v=')+2, 11);
      }
      if (url.indexOf('youtu.be') !== -1) {
        videoID = url.substr(url.indexOf('e/')+2, 11);
      }
      
      if (videoID.length > 0) {
        $http.get('/api/process?id=' + videoID)
        .success(function(data) {
          if (data === null) {
          $scope.error = 'Something went wrong. Maybe we screwed up, but would you mind making sure your link goes to a YouTube video? Channels won\'t work. Thanks.';
          }
          else {
            $scope.video = data;
            $scope.video.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + data.id);
            $scope.video.pastDate = (new Date($scope.video.pastMS));
            if ($scope.video.pastDate.getFullYear() < 0) {
              $scope.video.pastDate.setFullYear(-($scope.video.pastDate.getFullYear()));
              $scope.video.bc = true;
            }
            $scope.blurb = Blurb.getBlurb($scope.video.pastMS);
          }
          $scope.processing = false;
        })
        .error(function(data) {
          $scope.error = data || 'Something went wrong. Maybe we screwed up, but would you mind making sure your link goes to a YouTube video? Channels won\'t work. Thanks.';
          $scope.processing = false;
        });
      }
      else {
        $scope.error = 'A valid YouTube URL is required. Otherwise it won\'t work.';
        $scope.processing = false;
      }
    };

  });