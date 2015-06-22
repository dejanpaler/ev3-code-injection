(function () {
  'use strict';

  angular
    .module('brick')
    .controller('BrickCtrl', BrickCtrl);

  function BrickCtrl(brickCommands) {
    var vm = this;

    vm.runScript = brickCommands.runScript;
    vm.stopScript = brickCommands.stopScript;

    vm.editorOptions = {
      theme: 'twilight',
      mode: 'javascript',
      onLoad: brickCommands.editorLoaded
    };
    vm.statusOptions = {
      useWrapMode: true,
      theme: 'chaos',
      mode: 'batchfile',
      onLoad: brickCommands.statusLoaded
    };
  }
}());
