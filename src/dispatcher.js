

export class Dispatcher {

    #subs = new Map()
    #afetrHandlers = []

    afterEveryHandler(handler) {
        this.#afetrHandlers.push(handler)

        return () => {
            const idx = this.#afetrHandlers.indexOf(handler)

            this.#afetrHandlers.splice(idx, 1)
        }
    }
    subscribe(commandeName, handler) {
        if (!this.#subs.has(commandeName)) {
            this.#subs.set(commandeName, [])
        }

        const handlers = this.#subs.get(commandeName)

        if (handlers.includes(handler)) {
            return () => {}
        }

        handlers.push(handler)

        return () => {
            const idx = handlers.indexOf(handler)
            handlers.splice(idx, 1)
        }
    }

    dispatch(commandeName, payload) {
        if (!this.#subs.has(commandeName)) {
            this.#subs.get(commandeName).forEach(handler => handler(payload))
        } else {
            console.warn(`No handlers for command: ${commandeName}`)
        }
        this.#afetrHandlers.forEach(fn => fn())
    }
}