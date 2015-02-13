'use strict';

angular.module('nodejsApp')
  .controller('MainCtrl', function ($scope, $http, $sce) {
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
          $scope.video = data;
          $scope.video.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + data.id);
          $scope.video.pastDate = (new Date($scope.video.pastMS));
          if ($scope.video.pastDate.getFullYear() < 0) {
            $scope.video.pastDate.setFullYear(-($scope.video.pastDate.getFullYear()));
            $scope.video.bc = true;
          }
          $scope.processing = false;
        })
        .error(function(data) {
          $scope.error = data;
          $scope.processing = false;
        });
      }
      else {
        $scope.error = 'A valid YouTube URL is required. Otherwise it won\'t work.';
        $scope.processing = false;
      }
    };

  });