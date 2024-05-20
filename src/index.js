import { h, hFragment } from "./h.js"


const todos = ["code", "eat", "sleep"]
function TodosList(todos) {
    return h('ul', {}, todos.map((todo) => h('li', {}, [todo])))
    }
let dom = hFragment([
    h("h1", {className: "title"}, ["Todos"]),
    TodosList(todos)
])

console.log(dom)