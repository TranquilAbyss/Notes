function whiteKeyModule(letter, octave, keyPressHooks = [], keyReleaseHooks = []) {
    let module = keyModule(letter, octave, keyPressHooks, keyReleaseHooks)
    module.classList.add("whitekey")
    module.style.padding = "55.6px 9.4px"
    module.style.display = "inline-block"
    module.style.boarder = "2px solid black"
    module.style.backgroundColor = "white"
    return module
}
