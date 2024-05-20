import { hString } from "../h.js"


export function withoutNulls(arr) {
    return arr.filter(item => item != null)
}

export function mapTextNode(arr) {
    return arr.map(item => typeof item === "string" ? hString(item): item)
}