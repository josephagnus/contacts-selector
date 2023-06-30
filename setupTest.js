global.setImmediate = (func) => {
    setTimeout(func, 0)
}