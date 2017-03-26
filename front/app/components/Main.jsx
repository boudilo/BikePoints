var React = require('react');
var ItemsList = require('./ItemsList');
var BikePointsMap = require('./BikePointsMap');

class Main extends React.Component {
    render() {
		return (
            <div id="app">
                <BikePointsMap coords={this.props.data.coords} />
                <ItemsList title={this.props.data.title} itemlist={this.props.data.items} />
            </div>
        )
    }
}

module.exports = Main;