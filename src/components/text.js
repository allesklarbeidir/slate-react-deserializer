import Debug from "debug"
import ImmutableTypes from "react-immutable-proptypes"
import React from "react"
import SlateTypes from "slate-prop-types"
import Types from "prop-types"

import Leaf from "./leaf"

/**
 * Debug.
 *
 * @type {Function}
 */

const debug = Debug("slate:node")

/**
 * Text.
 *
 * @type {Component}
 */

class Text extends React.Component {
  /**
   * Property types.
   *
   * @type {Object}
   */

  static propTypes = {
    block: SlateTypes.block,
    decorations: ImmutableTypes.list.isRequired,
    node: SlateTypes.node.isRequired,
    parent: SlateTypes.node.isRequired,
    style: Types.object,
  }

  /**
   * Default prop types.
   *
   * @type {Object}
   */

  static defaultProps = {
    style: null,
  }

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  debug = (message, ...args) => {
    const { node } = this.props
    const { key } = node
    debug(message, `${key} (text)`, ...args)
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

    const { decorations, node, style, document } = this.props

    const decs = decorations.filter(d => {
      const { startKey, endKey } = d
      if (startKey == key || endKey == key) return true
      const startsBefore = document.areDescendantsSorted(startKey, key)
      const endsAfter = document.areDescendantsSorted(key, endKey)
      return startsBefore && endsAfter
    })

    const leaves = node.getLeaves(decs)
    let offset = 0

    const children = leaves.map((leaf, i) => {
      const child = this.renderLeaf(leaves, leaf, i, offset)
      offset += leaf.text.length
      return child
    })

    return (
      style ?
      <span style={style}>
        {children}
      </span>

      :

      children
    )
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

  renderLeaf = (leaves, leaf, index, offset) => {
    const { block, node, parent, renderStack } = this.props
    const { text, marks } = leaf

    return (
      <Leaf
        key={index}
        block={block}
        index={index}
        marks={marks}
        node={node}
        offset={offset}
        parent={parent}
        leaves={leaves}
        text={text}
        renderStack={renderStack}
      />
    )
  }
}

/**
 * Export.
 *
 * @type {Component}
 */

export default Text
