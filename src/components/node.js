import Debug from "debug"
import ImmutableTypes from "react-immutable-proptypes"
import React from "react"
import SlateTypes from "slate-prop-types"
import logger from "slate-dev-logger"
import Types from "prop-types"

import Void from "./void"
import Text from "./text"

/**
 * Debug.
 *
 * @type {Function}
 */

const debug = Debug("slate:node")

/**
 * Node.
 *
 * @type {Component}
 */

class Node extends React.Component{
  /**
   * Property types.
   *
   * @type {Object}
   */

  static propTypes = {
    block: SlateTypes.block,
    decorations: ImmutableTypes.list,
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
    debug(message, `${key} (${type})`, ...args)
  }

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

  render() {
    this.debug("render", this)
    const { renderStack, node, parent, passProps } = this.props

    let children = node.nodes.toArray().map((child, i) => {
      return this.renderNode(child, i, passProps)
    })

    // Attributes that the developer must to mix into the element in their
    // custom node renderer component.
    const attributes = {}
    const props = {
      node,
      parent
    }

    const element = renderStack.renderNodes({
      props:{...props, ...passProps},
      attributes,
      children,
    });

    return node.isVoid ? <Void {...this.props}>{element}</Void> : element
  }

  /**
   * Render a `child` node.
   *
   * @param {Node} child
   * @param {Number} index
   * @return {Element}
   */

  renderNode = (child, index, passProps = {}) => {
    const { renderStack, block, decorations, node, document } = this.props;
    const Component = child.object == "text" ? Text : Node

    const decs = decorations.concat(renderStack.renderDecorations(node))
    
    return (
      <Component
        block={node.object == "block" ? node : block}
        decorations={decs}
        key={index}
        node={child}
        parent={node}
        document={document}
        renderStack={renderStack}
        passProps={passProps}
      />
    )
  }
}

/**
 * Export.
 *
 * @type {Component}
 */

export default Node
