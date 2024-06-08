import { createApp } from "./app.js"
import { h,  hString } from "./h.js"


createApp({
    state: 0,
    reducers: {
        up : (state, amount) => {
            return state +  Number(amount)
        }
    },
    view: app
}).mount(document.body)

function app(state, emit) {
    return h('button', {
        on: {click: () => emit("up", 1)},
    }, [hString(state)])
}