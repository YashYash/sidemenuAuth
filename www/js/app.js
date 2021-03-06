// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var pyar = angular.module('pyar', ['ionic', 'pyar.controllers', 'firebase'])

pyar.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

pyar.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('login', {
      url:"/",
      templateUrl: "templates/login.html",
      controller: 'loginCtrl'
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller:"homeCtrl"
        }
      }
    })    

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller:"profileCtrl"
        }
      }
    })

    .state('app.confirm', {
      url: "/profile/confirm",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile_confirm.html",
          controller:"profileCtrl"
        }
      }
    })        
     

    .state('app.chat', {
      url: "/chat",
      views: {
        'menuContent' :{
          templateUrl: "templates/chat.html",
          controller:"chatCtrl"
        }
      }
    })      


    .state('app.logout', {
      url: "/logout",
      views: {
        'menuContent' :{
          templateUrl: "templates/logout.html",
          controller:"loginCtrl"
        }
      }
    })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});



