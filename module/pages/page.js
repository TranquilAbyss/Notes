function PageModule(name) {
    let module = CreateEle("div")
    module.classList.add("page")
    module.name = name
    module.hide = function() {
        this.style.display = "none"
    }
    module.show = function() {
        this.style.display = "block"
    }
    return module
}
