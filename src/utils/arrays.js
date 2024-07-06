import { hString } from "../h.js"

export const ARRAY_DIFF_OP = {
    ADD: "add",
    REMOVE: "remove",
    MOVE: "move",
    NOOP: "NOOP"
}

export function withoutNulls(arr) {
    return arr.filter(item => item != null)
}

export function mapTextNode(arr) {
    return arr.map(item => typeof item === "string" ? hString(item): item)
}

export function arraysDiffing(oldArray, newArray) {
    return {
        added: newArray.filter(el => !oldArray.includes(el)),
        removed: newArray.filter(el => !newArray.includes(el))
    }
}