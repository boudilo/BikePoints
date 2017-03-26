var login = "firstClient";
var socket = new WebSocket("ws://localhost:3000/?login=" + login);

socket.onmessage = function (event) {
	var incomingMessage = event.data;
	parseMessage(incomingMessage);
};

function parseMessage (serverAnswer) {
	var info = JSON.parse(serverAnswer);
	switch(info.type){

	case "initialList" :
		var bikePointsNames = [];
		var i = 0;
		for (var key in info.content) {
			bikePointsNames[i] = info.content[key].commonName;
			i++;
		}

		var propsNew = {
			title: "Bike points list",
			items: bikePointsNames.sort()
		}

		ReactDOM.render(
            <ItemsList title={propsNew.title} itemlist={propsNew.items} />,
            document.getElementById("container")
		)
		break;
	}
}

const propsDefault = {
	title: "Bike points list",
	items: [
			"Receiving data",
	]
};
     
class Item extends React.Component {
    render() {
		return <option value={this.props.name}>{this.props.name}</option>
    }
}

class ItemsList extends React.Component {
    render() {
        return(
            <div id="bikepointslist">
				<p>{this.props.title}</p>
				<form name={this.props.title}>
					<select size="1">
		                    {this.props.itemlist.map(function(item){
		                        return <Item key={item} name={item} />
		                    })}
					</select>
				</form>
            </div>);
    }
}

ReactDOM.render(
    <ItemsList title={propsDefault.title} itemlist={propsDefault.items} />,
    document.getElementById("container")
)