import { destroyDOM } from "./destroy-dom.js"
import { Dispatcher } from "./dispatcher.js"
import { mountDOM } from "./mount-dom.js"


export function createApp({state, view, reducers = {}}) {
    let parentEl = null
    let vdom = null

    const dispatcher = new Dispatcher()
    const subscriptions = [dispatcher.afterEveryHandler(renderApp)]

    for (const actionName in reducers) {
        const reducer = reducers[actionName]
        const subRemover = dispatcher.subscribe(actionName, (payload) => {
            let data = reducer(state, payload)
            state = data
        })

        subscriptions.push(subRemover)
    }


    function emit(actionName, payload) {
        dispatcher.dispatch(actionName, payload)
    }
    function renderApp() {
        if (vdom) {
            destroyDOM(vdom)
        }
        vdom = view(state, emit)
        mountDOM(vdom, parentEl)
    }

    return {
        mount(_parentEl) {
            parentEl = _parentEl
            renderApp()
        },
        unmount() {
            destroyDOM(vdom)
            vdom = null
            subscriptions.forEach(unSub => unSub())
        }
    }
}