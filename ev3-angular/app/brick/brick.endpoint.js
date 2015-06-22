(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name todos.factory:TodosEndpoint
   *
   * @description
   *
   */
  angular
    .module('brick')
    .factory('brickEndpoint', brickEndpoint);

  function brickEndpoint($websocket) {
    var service, dataStream, responseCallback;

    responseCallback = {};

    service = {
      responseCallback: responseCallback,
      sendCommand: sendCommand
    };

    init();

    return service;

    function init() {
      // Open a WebSocket connection
      dataStream = $websocket('ws://localhost:8080/brick-javaee/commands');

      dataStream.onMessage(function (response) {
        responseCallback.call(response.data);
      });

      dataStream.onOpen(function (response) {
        console.info(response);
      });

      dataStream.onClose(function (response) {
        console.info(response);
      });
    }

    function sendCommand(command) {
      dataStream.send(command);
    }
  }
}());
