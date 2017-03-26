var React = require('react');
var { Map, TileLayer } = require('react-leaflet');
var BikePointMarker = require('./BikePointMarker');

class BikePointsMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    };
  }

  render() {
    var position = [this.state.lat, this.state.lng];
    var coords = this.props.coords;
    return (
        <div id="map-container">
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                {coords.map(function(point){
                    return <BikePointMarker key={point} position={point} />
                })}
            </Map>
        </div>
    );
  }
}

module.exports = BikePointsMap;