

export function objectsDiffing(newObj, oldObj) {
    const newKeys = Object.keys(newObj);
    const oldKeys = Object.keys(oldObj);

    return {
        removed: oldKeys.filter(key => !(key in newObj)),
        added: newKeys.filter(key => !(key in oldObj)),
        updated: newKeys.filter(key => (key in oldObj) && oldObj[key] !== newObj[key])
    }
}