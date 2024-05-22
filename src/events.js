export function addEventListeners(events = {}, element) {
    for (const [eventName, handler] of Object.entries(events)) {
        addEventListener(eventName, handler, element)
    }

    return events
}

export function addEventListener(eventName, handler, el) {
    el.addEventListener(eventName, handler)
    return handler
}


export function removeEventListeners(listeners, el) {
    for (let [name, handler] of Object.entries(listeners)) {
        el.removeEventListener(name, handler)
    }
}