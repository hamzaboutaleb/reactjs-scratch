import { mapTextNode, withoutNulls } from "./utils/arrays.js"


export const DOM_TYPE = {
    TEXT : "TEXT",
    ELEMENT : "ELEMENT",
    FRAGMENT: "FRAGMENT"
}

export function h(tag, props = {}, children = []) {
    return {
        type: DOM_TYPE.ELEMENT,
        tag,
        props,
        children: mapTextNode(withoutNulls(children))
    }
}

export function hFragment(vNodes) {
    return {
        type: DOM_TYPE.FRAGMENT,
        children: mapTextNode(withoutNulls(vNodes))
    }
}

export function hString(value) {
    return {
        value,
        type: DOM_TYPE.TEXT
    }
}
