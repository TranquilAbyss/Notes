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
    module.octaveIndex = 0;
    keyPressHooks.push((key) => lastKey = key)
    for (let o = 1; o <= 7; o++) {
        module.InsertEle(octaveModule(o, o - 1, keyPressHooks, keyReleaseHooks))
    }
    module.InsertEle(octaveCModule(8, keyPressHooks, keyReleaseHooks))
    setupHotKeys(module)
    return module
}

function pianoEmptyModule() {
    let module = CreateEle('div')
    module.classList.add("piano")
    module.octaveIndex = 0;
    module.onmouseleave = () => {currentPiano = null}
    module.onmouseover = () => {currentPiano = event.target.parentElement.parentElement}
    return module
}

function setupHotKeys(module) {
    if (module.childNodes[module.octaveIndex].childNodes.length >= 1) module.childNodes[module.octaveIndex].childNodes[0].hotKey = "a"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 2) module.childNodes[module.octaveIndex].childNodes[1].hotKey = "s"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 3) module.childNodes[module.octaveIndex].childNodes[2].hotKey = "d"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 4) module.childNodes[module.octaveIndex].childNodes[3].hotKey = "f"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 5) module.childNodes[module.octaveIndex].childNodes[4].hotKey = "g"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 6) module.childNodes[module.octaveIndex].childNodes[5].hotKey = "h"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 7) module.childNodes[module.octaveIndex].childNodes[6].hotKey = "j"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 8) module.childNodes[module.octaveIndex].childNodes[7].hotKey = "w"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 9) module.childNodes[module.octaveIndex].childNodes[8].hotKey = "e"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 10) module.childNodes[module.octaveIndex].childNodes[9].hotKey = "t"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 11) module.childNodes[module.octaveIndex].childNodes[10].hotKey = "y"
    if (module.childNodes[module.octaveIndex].childNodes.length >= 12) module.childNodes[module.octaveIndex].childNodes[11].hotKey = "u"
}

function removeHotKeys(module) {
    if (module.childNodes[module.octaveIndex].childNodes.length >= 1) module.childNodes[module.octaveIndex].childNodes[0].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 2) module.childNodes[module.octaveIndex].childNodes[1].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 3) module.childNodes[module.octaveIndex].childNodes[2].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 4) module.childNodes[module.octaveIndex].childNodes[3].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 5) module.childNodes[module.octaveIndex].childNodes[4].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 6) module.childNodes[module.octaveIndex].childNodes[5].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 7) module.childNodes[module.octaveIndex].childNodes[6].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 8) module.childNodes[module.octaveIndex].childNodes[7].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 9) module.childNodes[module.octaveIndex].childNodes[8].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 10) module.childNodes[module.octaveIndex].childNodes[9].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 11) module.childNodes[module.octaveIndex].childNodes[10].hotKey = ""
    if (module.childNodes[module.octaveIndex].childNodes.length >= 12) module.childNodes[module.octaveIndex].childNodes[11].hotKey = ""
}

function playNoteOnKeyPress() {
    if (!currentPiano) {
        return
    }
    if (currentPiano.classList.contains("piano")) {
        if (event.key == "z")
            ShiftOctaveLeft();
        else if(event.key == "x")
            ShiftOctaveRight();
        else 
            currentPiano.childNodes[currentPiano.octaveIndex].childNodes.forEach((key) => key.playHotKey(event.key))
    }
}

function releaseNoteOnKeyRelease() {
    if (!currentPiano) {
        return
    }
    if (currentPiano.classList.contains("piano")) {
        currentPiano.childNodes[currentPiano.octaveIndex].childNodes.forEach((key) => key.releaseHotKey(event.key))
    }
}

function ShiftOctaveLeft() 
{
    if (currentPiano.classList.contains("piano")) {
        if (currentPiano.octaveIndex != 0) {
            removeHotKeys(currentPiano);
            currentPiano.octaveIndex-- 
            setupHotKeys(currentPiano)
        }
    }
}

function ShiftOctaveRight() 
{
    if (currentPiano.classList.contains("piano")) {
        if (currentPiano.octaveIndex != (currentPiano.childNodes.length - 1)) {
            removeHotKeys(currentPiano);
            currentPiano.octaveIndex++ 
            setupHotKeys(currentPiano)
        }
    }
}