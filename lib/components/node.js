var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Debug from "debug";
import ImmutableTypes from "react-immutable-proptypes";
import React from "react";
import SlateTypes from "slate-prop-types";
import logger from "slate-dev-logger";
import Types from "prop-types";

import Void from "./void";
import Text from "./text";

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = Debug("slate:node");

/**
 * Node.
 *
 * @type {Component}
 */

var Node = function (_React$Component) {
  _inherits(Node, _React$Component);

  function Node() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Node);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Node.__proto__ || Object.getPrototypeOf(Node)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  _createClass(Node, [{
    key: "render",


    /**
     * Should the node update?
     *
     * @param {Object} nextProps
     * @param {Object} value
     * @return {Boolean}
     */

    /*shouldComponentUpdate = nextProps => {
      //not needed for editor-dettached version
    }*/

    /**
     * Render.
     *
     * @return {Element}
     */

    value: function render() {
      var _this2 = this;

      this.debug("render", this);
      var _props = this.props,
          renderStack = _props.renderStack,
          node = _props.node,
          parent = _props.parent,
          passProps = _props.passProps;


      var children = node.nodes.toArray().map(function (child, i) {
        return _this2.renderNode(child, i, passProps);
      });

      // Attributes that the developer must to mix into the element in their
      // custom node renderer component.
      var attributes = {};
      var props = {
        node: node,
        parent: parent
      };

      var element = renderStack.renderNodes(_extends({}, props, {
        passProps: passProps,
        attributes: attributes,
        children: children
      }));

      return node.isVoid ? React.createElement(
        Void,
        this.props,
        element
      ) : element;
    }

    /**
     * Render a `child` node.
     *
     * @param {Node} child
     * @param {Number} index
     * @return {Element}
     */

  }]);

  return Node;
}(React.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Node.propTypes = {
  block: SlateTypes.block,
  decorations: ImmutableTypes.list,
  node: SlateTypes.node.isRequired,
  parent: SlateTypes.node.isRequired };

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var node = _this3.props.node;
    var key = node.key,
        type = node.type;

    debug.apply(undefined, [message, key + " (" + type + ")"].concat(args));
  };

  this.renderNode = function (child, index) {
    var passProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _props2 = _this3.props,
        renderStack = _props2.renderStack,
        block = _props2.block,
        decorations = _props2.decorations,
        node = _props2.node,
        document = _props2.document;

    var Component = child.object == "text" ? Text : Node;

    var decs = decorations.concat(renderStack.renderDecorations(node));

    return React.createElement(Component, {
      block: node.object == "block" ? node : block,
      decorations: decs,
      key: index,
      node: child,
      parent: node,
      document: document,
      renderStack: renderStack,
      passProps: passProps
    });
  };
};

export default Node;