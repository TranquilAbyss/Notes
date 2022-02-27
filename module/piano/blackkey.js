function blackKeyModule(letter, octave, left, keyPressHooks = [], keyReleaseHooks = []) {
    let module = keyModule(letter, octave, keyPressHooks, keyReleaseHooks)
    module.classList.add("blackkey")
    module.style.padding = "36.7px 4.7px"
    module.style.position = "absolute"
    module.style.boarder = "2px solid black"
    module.style.zIndex = "1"
    module.style.left = left+"px"

    module.style.backgroundColor = "black"
    return module
}
