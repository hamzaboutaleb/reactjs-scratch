

export function setAttributes(el, attrs) {
    const {class: className, style, ...otherAttrs} = attrs

    if (className) {
        setClass(el, className)
    }
    if (style) {
        Object.entries(style).forEach(([props, value]) => {
            setStyle(props, value, el)
        })
    }

    Object.entries(otherAttrs).forEach(([name, value]) => {
        setAttribute(name, value, el)
    })
}


export function setClass(el, className) {
    el.className = ""

    if (typeof className === "string") {
        el.className = className
    }

    if (Array.isArray(className)) {
        el.classList.add(...className)
    }
}

export function setStyle(props, value, el) {
    el.style[props] = value
}
export function removeStyle(props, el) {
    el.style[props] = null
}

export function setAttribute(name, value, el) {
    if (value == null) {
        removeAttribute(name, el)
    } else if (name.startsWith("data-")) {
        el.setAttribute(name, value)
    } else {
        el[name] = value
    }
}

function removeAttribute(name, el) {
    el[name] = null
    el.removeAttribute(name)
}