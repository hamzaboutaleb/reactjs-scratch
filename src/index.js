import { destroyDOM } from "./destroy-dom.js"
import { h, hFragment } from "./h.js"
import { mountDOM } from "./mount-dom.js"


const todos = ["code", "eat", "sleep"]
function TodosList(todos) {
    return h('ul', {}, todos.map((todo) => h('li', {}, [todo])))
    }
let dom = hFragment([
    h("h1", {className: "title", on:  {
        click: () => console.log("clicked")
    }}, ["Todos"]),
    TodosList(todos),
    h("input", {
        value: "ok",
        type: "text",
        style: {
            width: "500px"
        }
    })
])


mountDOM(dom, document.body)

setTimeout(() => {
    destroyDOM(dom)
}, 5000)