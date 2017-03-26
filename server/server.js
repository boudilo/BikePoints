var WebSocketServer = new require('ws');
var http = require('http');
var Static = require('node-static');
var request = require('request');
var converter = require('./modules/converter.js')

// Авторизация в API
var apiAuth = "?app_id={45c1ae07}&app_key={e0f42f5ea2998c88e74cdaf0c939a88b}";

// Клиенты
var clients = {};

// WebSocket-сервер на порте 3000
var webSocketServer = new WebSocketServer.Server({
	port: 3000
});
webSocketServer.on('connection', function (ws) {

  	var id = Math.random();
  	clients[id] = ws;

	// Отправка начальных данных
	request("https://api.tfl.gov.uk/BikePoint" + apiAuth, function (error, response, body) {
		var initialInfo = {
			type: "initialList",
			content: converter.getBikePointsInfo(body),
		};
		clients[id].send(JSON.stringify(initialInfo));
 	})

	ws.on('message', function (message) {
});

	ws.on('close', function () {
		delete clients[id];
	});

});