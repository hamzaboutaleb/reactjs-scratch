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

export function arraysDiffSequence(oldArray, newArray, equalsFn = (a, b) => a === b) {
    const array = ArrayWithOriginalIndices(oldArray, equalsFn)
    const sequences = []
    for (let i = 0; i < newArray.length; i++) {
        if (array.isRemoval(i, newArray)) {
            const deleteOp = array.removeItem(i);
            sequences.push(deleteOp)
            i--;
            continue
        }

        if (array.isNoop(i, newArray)) {
            const noopOp = array.noopItem(i)
            sequences.push(noopOp)
            continue
        }

        const newItem = newArray[i]
        if (array.isAddition(newItem, i)) {
            const addOp = array.addItem(newItem, i)
            sequences.push(addOp)
        }
    }

    return sequences
}

class ArrayWithOriginalIndices {
    #array = []
    #indices = []
    #equalfn

    constructor(array, equalFn) {
        this.#array = [...array]
        this.#indices = array.map((_, i) => i)
        this.#equalfn = equalFn
    }

    /** 
     * function return true if element at idx in old array doesnt exist in new array (is removed from new array)
     * @param {number} idx 
     * @param {Array} newArray
    */
    isRemoval(idx, newArray) {
        if (idx > this.length) {
            return false
        }
        let current = this.#array[idx]
        return newArray.findIndex((el) => this.#equalfn(el, current)) === -1 
    }

    /**
     * remove element at idx from array and indices then return operation Object
     * @param {number} idx 
     */
    removeItem(idx) {
        const operation = {
            op: ARRAY_DIFF_OP.REMOVE,
            index: idx,
            item: this.#array[idx]
        }
        this.#array.splice(idx, 1)
        this.#indices.splice(idx, 1)
        return operation
    }


    /**
     * check if both element same at the same id
     * @param {number} idx 
     * @param {Array} newArray 
     */
    isNoop(idx, newArray) {
        if (idx > this.length) {
            return false
        }
        const item = this.#array[idx]
        const newItem = newArray[idx]
        return this.#equalfn(item, newItem)
    }

    noopItem(index) {
        return {
            op: ARRAY_DIFF_OP.NOOP,
            item: this.#array[idx],
            index,
            originalIndex: this.originalIndex(index)
        }
    }

    isAddition(item, startIdx) {
        for (let i = startIdx; i < this.length; i++) {
            let current = this.#array[i]
            if (this.#equalfn(item, current)) return false
        }
        return true
    }

    addItem(item, index) {
        const operation = {
            op: ARRAY_DIFF_OP.ADD,
            item,
            index
        }
        this.#array.splice(index, 0, item)
        this.#indices.splice(index, 0, -1)
        return operation
    }
    originalIndex(idx) {
        return this.#indices[idx]
    }
    get length() {
        return this.#array.length
    }

}