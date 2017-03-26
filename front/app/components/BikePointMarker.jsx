var React = require('react');
var { Marker, Popup } = require('react-leaflet');

class BikePointMarker extends React.Component {
    render() {
		return (
            <Marker position={this.props.position}>
                <Popup>
                    <span>YEEEAAAH!!!</span>
                </Popup>
            </Marker>
        )
    }
}

module.exports = BikePointMarker;