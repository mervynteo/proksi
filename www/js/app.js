// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  openFB.init({appId: '410935619065311'});
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
.state('app.reply', {
      url: "/reply/:Id",
      cache: true,
      views: {
        'menuContent': {
          templateUrl: "templates/reply.html",
          controller: 'ReplyCtrl'
        }
      }
    })

  .state('app.messages', {
      url: "/messages",
      cache: true,
      views: {
        'menuContent': {
          templateUrl: "templates/messages.html",
          controller: 'UserMessageCtrl'
        }
      }
    })
    .state('app.jobs', {
      url: "/jobs",
      cache: true,
      views: {
        'menuContent': {
          templateUrl: "templates/jobs.html",
          controller: 'JobsCtrl'
        }
      }
    })

  .state('app.job', {
    url: "/jobs/:Id",
     cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/job.html",
        controller: 'JobCtrl'
      }
    }
  })

    .state('app.postjob', {
      url: "/postjob",
      cache: true,
      views: {
        'menuContent': {
          templateUrl: "templates/post_job.html",
          controller: 'PostJobCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/jobs');
});
