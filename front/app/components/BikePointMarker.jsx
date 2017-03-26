var React = require('react');
var { Marker, Popup } = require('react-leaflet');

class BikePointMarker extends React.Component {
    render() {
		return (
            <Marker position={this.props.position}>
                <Popup>
                    <span>Place for Bike Point Info :)</span>
                </Popup>
            </Marker>
        )
    }
}

module.exports = BikePointMarker;