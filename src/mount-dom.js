import { setAttributes } from "./attributes.js";
import { addEventListeners } from "./events.js";
import { DOM_TYPE } from "./h.js";


export function mountDOM(vDom, parentEl) {

    switch (vDom.type) {
        case DOM_TYPE.TEXT: {
            createTextNode(vDom, parentEl)
            break
        }

        case DOM_TYPE.ELEMENT: {
            createElementNode(vDom, parentEl)
            break
        }

        case DOM_TYPE.FRAGMENT: {
            createFragmentNode(vDom,parentEl)
            break
        }

        default: {
            throw new Error(`Can't mount DOM of Type ${vDom.type}`)
        }
    }
}

function createTextNode(vDom, parentEl) {
    const { value } = vDom
    const textNode = document.createTextNode(value)
    vDom.el = textNode
    parentEl.append(textNode)
}

function createFragmentNode(vDom, parentEl) {
    const { children } = vDom
    vDom.el = parentEl

    children.forEach(el => mountDOM(el, parentEl))
}

function createElementNode(vDom, parentEl) {
    const { tag, children, props } = vDom

    const elementNode = document.createElement(tag)
    addProps(elementNode, props, vDom)
    vDom.el = elementNode

    children.forEach(child => mountDOM(child, elementNode))

    parentEl.append(elementNode)
}

function addProps(element, props, vDom) {
    const {on: events, ...attrs} = props
    vDom.listeners = addEventListeners(events, element)
    setAttributes(element, attrs)
}

