var ReactDOM = require('react-dom');
var React = require('react');
var Main = require('./components/Main');

var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function (event) {
	var incomingMessage = event.data;
	parseMessage(incomingMessage);
};

function parseMessage (serverAnswer) {
	var info = JSON.parse(serverAnswer);
    var type = info.type;
    var content = info.content;
	switch(info.type){

	case "initialList" :
        var bikePointsNames = [];
        var bikePointsCoords = [];
        var bikePointsIDs = [];
        
		for (var i = 0; i < content.length; i++) {
            content[i] = JSON.parse(content[i]);
			bikePointsNames[i] = content[i].commonName;
            bikePointsCoords[i] = content[i].coords;
            bikePointsIDs[i] = content[i].id;
		}

		var propsNew = {
			title: "Bike points list",
			items: bikePointsNames,
            coords: bikePointsCoords,
            id: bikePointsIDs
		}

        ReactDOM.render(
            <Main data={propsNew} />,
            document.getElementById("main")
        )
		break;
	}
}

const propsDefault = {
	title: "Bike points list",
	items: ["Receiving data..."],
    coords: [[0,0]],
    id: [""]
};

ReactDOM.render(
    <Main data={propsDefault} />,
    document.getElementById("main")
)