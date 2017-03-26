"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var login = "firstClient";
var socket = new WebSocket("ws://localhost:3000/?login=" + login);

socket.onmessage = function (event) {
	var incomingMessage = event.data;
	parseMessage(incomingMessage);
};

function parseMessage(serverAnswer) {
	var info = JSON.parse(serverAnswer);
	switch (info.type) {

		case "initialList":
			var bikePointsNames = [];
			var i = 0;
			for (var key in info.content) {
				bikePointsNames[i] = info.content[key].commonName;
				i++;
			}

			var propsNew = {
				title: "Bike points list",
				items: bikePointsNames.sort()
			};

			ReactDOM.render(React.createElement(ItemsList, { title: propsNew.title, itemlist: propsNew.items }), document.getElementById("container"));
			break;
	}
}

var propsDefault = {
	title: "Bike points list",
	items: ["Receiving data"]
};

var Item = function (_React$Component) {
	_inherits(Item, _React$Component);

	function Item() {
		_classCallCheck(this, Item);

		return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
	}

	_createClass(Item, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"option",
				{ value: this.props.name },
				this.props.name
			);
		}
	}]);

	return Item;
}(React.Component);

var ItemsList = function (_React$Component2) {
	_inherits(ItemsList, _React$Component2);

	function ItemsList() {
		_classCallCheck(this, ItemsList);

		return _possibleConstructorReturn(this, (ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).apply(this, arguments));
	}

	_createClass(ItemsList, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "bikepointslist" },
				React.createElement(
					"p",
					null,
					this.props.title
				),
				React.createElement(
					"form",
					{ name: this.props.title },
					React.createElement(
						"select",
						{ size: "1" },
						"\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0",
						this.props.itemlist.map(function (item) {
							return React.createElement(Item, { key: item, name: item });
						})
					)
				),
				"\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0"
			);
		}
	}]);

	return ItemsList;
}(React.Component);

ReactDOM.render(React.createElement(ItemsList, { title: propsDefault.title, itemlist: propsDefault.items }), document.getElementById("container"));
