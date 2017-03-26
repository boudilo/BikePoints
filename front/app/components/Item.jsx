var React = require('react');

class Item extends React.Component {
    render() {
		return <option value={this.props.name}>{this.props.name}</option>
    }
}

module.exports = Item;