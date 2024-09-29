let currentPiano
let keyIntialPress = {}
let lastKey
let pressedKeys

window.AudioContext = new (window.AudioContext || window.webkitAudioContext)();

document.onkeydown = playNoteOnKeyPress
document.onkeyup = releaseNoteOnKeyRelease

function setLastKey(key) {
    lastKey = key
}

function pianoSingleOctaveModule(octave, keyPressHooks = [], keyReleaseHooks = []) {
    let module = pianoEmptyModule()
    keyPressHooks.push(setLastKey)
    module.InsertEle(octaveModule(octave, 0, keyPressHooks, keyReleaseHooks))
    setupHotKeys(module)
    return module
}

function pianoModule(keyPressHooks = [], keyReleaseHooks = []) {
    let module = pianoEmptyModule()
    keyPressHooks.push((key) => lastKey = key)
    for (let o = 1; o <= 7; o++) {
        module.InsertEle(octaveModule(o, o - 1, keyPressHooks, keyReleaseHooks))
    }
    module.InsertEle(whiteKeyModule("C", 8))
    setupHotKeys(module)
    return module
}

function pianoEmptyModule() {
    let module = CreateEle('div')
    module.classList.add("piano")
    module.onmouseleave = () => {currentPiano = null}
    module.onmouseover = () => {currentPiano = event.target.parentElement.parentElement}
    return module
}

function setupHotKeys(module) {
    module.childNodes[0].childNodes[0].hotKey = "a"
    module.childNodes[0].childNodes[1].hotKey = "s"
    module.childNodes[0].childNodes[2].hotKey = "d"
    module.childNodes[0].childNodes[3].hotKey = "f"
    module.childNodes[0].childNodes[4].hotKey = "g"
    module.childNodes[0].childNodes[5].hotKey = "h"
    module.childNodes[0].childNodes[6].hotKey = "j"
    module.childNodes[0].childNodes[7].hotKey = "w"
    module.childNodes[0].childNodes[8].hotKey = "e"
    module.childNodes[0].childNodes[9].hotKey = "t"
    module.childNodes[0].childNodes[10].hotKey = "y"
    module.childNodes[0].childNodes[11].hotKey = "u"
}

function playNoteOnKeyPress() {
    if (!currentPiano) {
        return
    }
    if (currentPiano.classList.contains("piano")) {
        currentPiano.childNodes[0].childNodes.forEach((key) => key.playHotKey(event.key))
    }
}

function releaseNoteOnKeyRelease() {
    if (!currentPiano) {
        return
    }
    if (currentPiano.classList.contains("piano")) {
        currentPiano.childNodes[0].childNodes.forEach((key) => key.releaseHotKey(event.key))
    }
}
