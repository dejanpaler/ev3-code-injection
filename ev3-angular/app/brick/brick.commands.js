(function () {
  'use strict';

  angular
    .module('brick')
    .factory('brickCommands', brickCommands);

  function brickCommands($filter, brickEndpoint) {
    var service, scriptEditor, brickStatus;

    brickEndpoint.responseCallback.call = commandResponse;

    service = {
      runScript: runScript,
      stopScript: stopScript,
      editorLoaded: editorLoaded,
      statusLoaded: statusLoaded
    };

    return service;

    function runScript() {
      var command = {
        action: 'run',
        script: scriptEditor.getValue()
      };
      logInfo('Sending script to the brick...');
      brickEndpoint.sendCommand(command);
    }

    function stopScript() {
      var command = {
        action: 'stop'
      };
      logInfo('Stopping script...');
      brickEndpoint.sendCommand(command);
    }

    function editorLoaded(editor) {
      scriptEditor = editor;
      editor.$blockScrolling = Infinity;
    }

    function statusLoaded(statusEditor) {
      statusEditor.$blockScrolling = Infinity;
      statusEditor.setReadOnly(true);
      statusEditor.renderer.setShowGutter(false);

      brickStatus = statusEditor;
    }

    function logInfo(message) {
      var now = $filter('date')(Date.now(), 'HH:mm:ss,sss');
      brickStatus.insert(now + ' INFO [ev3.angular] ' + message + '\n');
      brickStatus.scrollToLine(brickStatus.session.getLength(), true, true, function () {});
    }

    function logResponseInfo(message) {
      var now = $filter('date')(Date.now(), 'HH:mm:ss,sss');
      brickStatus.insert(now + ' INFO ' + message + '\n');
      brickStatus.scrollToLine(brickStatus.session.getLength(), true, true, function () {});
    }

    function commandResponse(data) {
      logResponseInfo(data);
    }
  }
}());
