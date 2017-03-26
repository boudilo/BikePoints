var WebSocketServer = new require('ws');
var http = require('http');
var Static = require('node-static');
var Url = require('url');
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

	var client = Url.parse(ws.upgradeReq.url, true).query
	clients[client.login] = ws;
	console.log("Новое соединение: " + client.login);

	// Отправка начальных данных
	request("https://api.tfl.gov.uk/BikePoint" + apiAuth, function (error, response, body) {
		var initialInfo = {
			type: "initialList",
			content: converter.getBikePointsInfo(body),
		};
		clients[client.login].send(JSON.stringify(initialInfo));
 	})

	ws.on('message', function (message) {

		var parsedMsg = JSON.parse(message);

		if (parsedMsg.message != undefined) {
			console.log('Получено сообщение: ' + parsedMsg.message);

			var messageSender;
			messageSender = Url.parse(ws.upgradeReq.url, true).query.login;

			for (var key in clients) {
				console.log("Отправляю сообщение: \"" + messageSender + ": " + parsedMsg.message + "\" клиенту " + key);
				clients[key].send(messageSender + ": " + parsedMsg.message);
			}
		}

	});

	ws.on('close', function () {
		console.log('Соединение закрыто: ' + client.login);
		delete clients[client.login];
	});

});