var ReactDOM = require('react-dom');
var React = require('react');
var ItemsList = require('./components/ItemsList');
var BikePointsMap = require('./components/BikePointsMap');

var login = "firstClient";
var socket = new WebSocket("ws://localhost:3000/?login=" + login);

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
            <ItemsList title={propsNew.title} itemlist={propsNew.items} />,
            document.getElementById("container")
		)
        
        ReactDOM.render(
            <BikePointsMap coords={propsNew.coords} id={propsNew.id}/>,
            document.getElementById("map-container")
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
    <ItemsList title={propsDefault.title} itemlist={propsDefault.items} />,
    document.getElementById("container")
)

ReactDOM.render(
    <BikePointsMap coords={propsDefault.coords} id={propsDefault.id}/>,
    document.getElementById("map-container")
)