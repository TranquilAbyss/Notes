function ToolbarModule() {
    let module = CreateEle("div")
    module.classList.add("toolbar")
    module.currentPage = null
    module.addPage = function(page) {
        if (page.classList.contains("page")) {
            // add button
            this.InsertEle(ToolbarButtonModule(page, toolbar))
            // set current page
            if (this.currentPage == null) {
                this.currentPage = page
            } else {
                page.hide()
            }
        }
    }
    return module
}

function ToolbarButtonModule(page, toolbar) {
    let module = CreateEle('button', {innerText: page.name})
    module.toolbar = toolbar
    module.page = page
    module.onclick = function() {
        this.toolbar.currentPage.hide()
        this.page.show()
        this.toolbar.currentPage = page
    }
    return module
}
