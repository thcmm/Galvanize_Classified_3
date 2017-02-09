////////////////////////////
// app.config.js         //
// Galvanize Classified 2 //
///////////////////////////
(function() {
  'use strict'

  angular.module('app')
    .config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'app',
        abstract: true,
        component: 'app',
      })
      .state({
        name: 'home',
        parent: 'app',
        url: '/',
        component: 'classifiedList',
      })
      .state({
       name: 'classified-detail',
       parent: 'app',
       url: '/:id',
       component: 'classifiedDetail',
     })
  }
}());
