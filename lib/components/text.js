var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Debug from "debug";
import ImmutableTypes from "react-immutable-proptypes";
import React from "react";
import SlateTypes from "slate-prop-types";
import Types from "prop-types";

import Leaf from "./leaf";

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = Debug("slate:node");

/**
 * Text.
 *
 * @type {Component}
 */

var Text = function (_React$Component) {
  _inherits(Text, _React$Component);

  function Text() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Text);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Text.__proto__ || Object.getPrototypeOf(Text)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Default prop types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  _createClass(Text, [{
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
          decorations = _props.decorations,
          node = _props.node,
          style = _props.style,
          document = _props.document;


      var decs = decorations.filter(function (d) {
        var startKey = d.startKey,
            endKey = d.endKey;

        if (startKey == key || endKey == key) return true;
        var startsBefore = document.areDescendantsSorted(startKey, key);
        var endsAfter = document.areDescendantsSorted(key, endKey);
        return startsBefore && endsAfter;
      });

      var leaves = node.getLeaves(decs);
      var offset = 0;

      var children = leaves.map(function (leaf, i) {
        var child = _this2.renderLeaf(leaves, leaf, i, offset);
        offset += leaf.text.length;
        return child;
      });

      return style ? React.createElement(
        "span",
        { style: style },
        children
      ) : children;
    }

    /**
     * Render a single leaf given a `leaf` and `offset`.
     *
     * @param {List<Leaf>} leaves
     * @param {Leaf} leaf
     * @param {Number} index
     * @param {Number} offset
     * @return {Element} leaf
     */

  }]);

  return Text;
}(React.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Text.propTypes = {
  block: SlateTypes.block,
  decorations: ImmutableTypes.list.isRequired,
  node: SlateTypes.node.isRequired,
  parent: SlateTypes.node.isRequired,
  style: Types.object };
Text.defaultProps = {
  style: null };

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var node = _this3.props.node;
    var key = node.key;

    debug.apply(undefined, [message, key + " (text)"].concat(args));
  };

  this.renderLeaf = function (leaves, leaf, index, offset) {
    var _props2 = _this3.props,
        block = _props2.block,
        node = _props2.node,
        parent = _props2.parent,
        renderStack = _props2.renderStack;
    var text = leaf.text,
        marks = leaf.marks;


    return React.createElement(Leaf, {
      key: index,
      block: block,
      index: index,
      marks: marks,
      node: node,
      offset: offset,
      parent: parent,
      leaves: leaves,
      text: text,
      renderStack: renderStack
    });
  };
};

export default Text;