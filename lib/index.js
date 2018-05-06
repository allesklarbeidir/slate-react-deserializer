function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from "react";
import { Document } from "slate";
import * as Immutable from "immutable";
import Node from "./components/node";

var ReactDeSerializer = function ReactDeSerializer(renderDecorations, renderNodes, renderMarks) {
    _classCallCheck(this, ReactDeSerializer);

    _initialiseProps.call(this);

    this.renderStack.renderNodes = renderNodes;
    this.renderStack.renderMarks = renderMarks;
    this.renderStack.renderDecorations = renderDecorations;
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.renderStack = {};

    this.deserialize = function (document) {
        var doc = null;
        if (document && document.object === "document" && document.nodes) {
            doc = document;
        } else if (document && document.object === "value" && document.document && document.document.nodes) {
            doc = document.document;
        } else {
            throw new Error("Document value is neither a Slate-Value (JSON)-object nor a Slate-Document (JSON)-object!");
        }
        doc = Document.fromJSON(doc);

        return doc.nodes.map(function (node, i, nodes) {
            /*passProps is accepted from outside to pass through to rendered components*/
            return React.createElement(Node, { key: i, node: node, parent: doc, document: doc, renderStack: _this.renderStack, decorations: Immutable.List([]) });
        });
    };
};

export default ReactDeSerializer;