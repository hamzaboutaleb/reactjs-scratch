import { removeEventListeners } from "./events.js";
import { DOM_TYPE } from "./h.js";


export function destroyDOM(vDom) {
    const { type } = vDom

    switch (type) {
        case DOM_TYPE.TEXT: {
            removeTextNode(vDom)
            break
        }

        case DOM_TYPE.FRAGMENT : {
            removeFragmentNode(vDom)
            break
        }

        case DOM_TYPE.ELEMENT : {
            removeElementNode(vDom)
            break
        }
    }
}

function removeTextNode(vDom) {
    const { el } = vDom
    el.remove()
}

function removeElementNode(vDom) {
    const { el, children, listeners } = vDom
    el.remove()
    children.forEach(destroyDOM)
    if (listeners) {
        removeEventListeners(listeners, el)
        delete vDom.listeners
    }
}

function removeFragmentNode(vDom) {
    const { children } = vDom

    children.forEach(destroyDOM)
}