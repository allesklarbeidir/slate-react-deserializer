import React from "react";
import { Document } from "slate";
import * as Immutable from "immutable";
import Node from "./components/node";

class ReactDeSerializer{

    renderStack:{
        renderNodes:Function,
        renderMarks:Function,
        renderDecorations:Function
    } = {};

    constructor(renderDecorations:Function, renderNodes:Function, renderMarks:Function){
        this.renderStack.renderNodes = renderNodes;
        this.renderStack.renderMarks = renderMarks;
        this.renderStack.renderDecorations = renderDecorations;
    }

    deserialize = (document) =>{
        let doc = null;
        if(document && document.object === "document" && document.nodes){
            doc = document;
        }
        else if(document && document.object === "value" && document.document && document.document.nodes){
            doc = document.document;
        }
        else{
            throw new Error("Document value is neither a Slate-Value (JSON)-object nor a Slate-Document (JSON)-object!")
        }
        doc = Document.fromJSON(doc);

        return doc.nodes.map((node,i,nodes) =>{
            /*passProps is accepted from outside to pass through to rendered components*/
            return (
                <Node key={i} node={node} parent={doc} document={doc} renderStack={this.renderStack} decorations={Immutable.List([])} />
            )
        });
    }

}

export default ReactDeSerializer;