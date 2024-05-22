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