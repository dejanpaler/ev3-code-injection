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
      statusLoaded: statusLoaded,
      clearStatus: clearStatus,
      reconnect: reconnect
    };

    return service;

    function clearStatus() {
      brickStatus.setValue('');
    }

    function runScript() {
      var command = {
        action: 'run',
        script: scriptEditor.getValue()
      };
      logInfo('Sending script to the brick...');
      brickEndpoint.sendCommand(command);
    }

    function stopScript() {
      logInfo('Stopping script...');
      sendCommand('stop');
    }

    function reconnect() {
      logInfo('Reconnecting to the server...');
      sendCommand('reconnect');
    }

    function sendCommand(action) {
      var command = {
        action: action
      };
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
