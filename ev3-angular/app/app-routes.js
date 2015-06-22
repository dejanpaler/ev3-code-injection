(function () {
  'use strict';

  angular
    .module('ev3')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/brick');
  }
}());
