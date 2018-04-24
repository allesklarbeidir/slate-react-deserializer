import Debug from "debug"
import React from "react"
import SlateTypes from "slate-prop-types"
import Types from "prop-types"

import Text from "./text"

/**
 * Debug.
 *
 * @type {Function}
 */

const debug = Debug("slate:void")

/**
 * Void.
 *
 * @type {Component}
 */

class Void extends React.Component {
  /**
   * Property types.
   *
   * @type {Object}
   */

  static propTypes = {
    block: SlateTypes.block,
    children: Types.any.isRequired,
    node: SlateTypes.node.isRequired,
    parent: SlateTypes.node.isRequired,
  }

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  debug = (message, ...args) => {
    const { node } = this.props
    const { key, type } = node
    const id = `${key} (${type})`
    debug(message, `${id}`, ...args)
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { props } = this
    const { children, node } = props
    const Tag = node.object == "block" ? "div" : "span";

    this.debug("render", { props })

    return (
      <Tag>
        {children}
      </Tag>
    )
  }

  /**
   * Render the void node"s text node, which will catch the cursor when it the
   * void node is navigated to with the arrow keys.
   *
   * Having this text node there means the browser continues to manage the
   * selection natively, so it keeps track of the right offset when moving
   * across the block.
   *
   * @return {Element}
   */

  renderText = () => {
    const {
      block,
      decorations,
      node
    } = this.props
    const child = node.getFirstText()
    return (
      <Text
        block={node.object == "block" ? node : block}
        decorations={decorations}
        key={child.key}
        node={child}
        parent={node}
      />
    )
  }
}

/**
 * Export.
 *
 * @type {Component}
 */

export default Void
