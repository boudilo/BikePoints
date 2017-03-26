var React = require('react');
var Item = require('./Item');

class ItemsList extends React.Component {
    render() {
        return(
            <div id="container">
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

module.exports = ItemsList;