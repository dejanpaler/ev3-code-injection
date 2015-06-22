(function () {
  'use strict';

  angular
    .module('brick')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('brick', {
        url: '/brick',
        templateUrl: 'brick/brick.tpl.html',
        controller: 'BrickCtrl',
        controllerAs: 'vm'
      });
  }
}());
