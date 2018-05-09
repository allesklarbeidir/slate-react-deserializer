import Debug from "debug"
import React from "react"
import Types from "prop-types"
import SlateTypes from "slate-prop-types"

import OffsetKey from "../utils/offset-key"

/**
 * Debugger.
 *
 * @type {Function}
 */

const debug = Debug("slate:leaves")

/**
 * Leaf.
 *
 * @type {Component}
 */

class Leaf extends React.Component {
  /**
   * Property types.
   *
   * @type {Object}
   */

  static propTypes = {
    block: SlateTypes.block.isRequired,
    index: Types.number.isRequired,
    leaves: SlateTypes.leaves.isRequired,
    marks: SlateTypes.marks.isRequired,
    node: SlateTypes.node.isRequired,
    offset: Types.number.isRequired,
    parent: SlateTypes.node.isRequired,
    text: Types.string.isRequired,
  }

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  debug = (message, ...args) => {
    debug(message, `${this.props.node.key}-${this.props.index}`, ...args)
  }

  /**
   * Should component update?
   *
   * @param {Object} props
   * @return {Boolean}
   */

  /*shouldComponentUpdate = nextProps => {
    //not needed for editor-dettached version
  }*/

  /**
   * Render the leaf.
   *
   * @return {Element}
   */

  render() {
    this.debug("render", this)

    const { node, index } = this.props
    const offsetKey = OffsetKey.stringify({
      key: node.key,
      index,
    })

    return this.renderMarks();
  }

  /**
   * Render all of the leaf"s mark components.
   *
   * @return {Element}
   */

  renderMarks() {
    const { marks, node, offset, text, renderStack, passProps } = this.props
    const leaf = this.renderText();

    return marks.reduce((children, mark) => {
      const props = { mark, marks, node, offset, text, children, passProps };
      const element = renderStack.renderMarks(props);
      return element || children
    }, leaf)
  }

  /**
   * Render the text content of the leaf, accounting for browsers.
   *
   * @return {Element}
   */

  renderText() {
    const { block, node, parent, text, index, leaves } = this.props

    // COMPAT: Browsers will collapse trailing new lines at the end of blocks,
    // so we need to add an extra trailing new lines to prevent that.
    const lastText = block.getLastText()
    const lastChar = text.charAt(text.length - 1)
    const isLastText = node === lastText
    const isLastLeaf = index === leaves.size - 1
    if (isLastText && isLastLeaf && lastChar === "\n") return `${text}\n`

    // Otherwise, just return the text.
    return text
  }
}

/**
 * Export.
 *
 * @type {Component}
 */

export default Leaf
