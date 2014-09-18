(function () {

  angular.module('SampleApp', ['ngRoute', 'ngAnimate'])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/partial1.html",
          controller: "MainController"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ]);

  //Load controller
  angular.module('SampleApp')
  .controller('MainController', [
    '$scope', '$http',
    function( $scope, $http ) {
      $scope.test = "Testing...";

      ///////////////////

      var apiEndpoint = 'http://vimeo.com/api/v2/';
      var oEmbedEndpoint = 'http://vimeo.com/api/oembed.json';
      var oEmbedCallback = 'switchVideo';
      var videosCallback = 'setupGallery';
      var userCallback = 'getChannels';
      var vimeoUsername = 'user381256';

      var vimeoUrl = apiEndpoint + vimeoUsername + '/channels.json';


      $scope.channels = [ ];

      $http.get( vimeoUrl ).
        then(function(response) {
          for (var i = 0; i < response.data.length; i++) {

            var channel = {};
            channel.id = response.data[i].id;
            channel.name = response.data[i].name;
            channel.videos = [];

            $scope.channels.push( channel );
          }

        }).then(function(){

            for (var i = 0; i < $scope.channels.length; i++) {

              var channelUrl = apiEndpoint + 'channel/'+ $scope.channels[i].id + '/videos.json';

              (function( count ){
                $http.get( channelUrl ).then(function(response){
                  $scope.channels[count]['videos'] = response.data;
                });
              })(i)

            }
        });

    }
  ]);

}());



$(document).ready(function() {
   $('.thumbnail').fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    helpers : {
      media : {}
    }
  });
});