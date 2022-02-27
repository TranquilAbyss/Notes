let currentPiano
let keyIntialPress = {}
let lastKey

document.onkeydown = playNoteOnKeyPress
document.onkeyup = releaseKey

function releaseKey() {
    //TODO replace with better release code, instead of last (some get stuck)
    if (lastKey) {
        lastKey.releaseKey()
    }
    if (event.key) {
        keyIntialPress[event.key] = true
    }
}

function setLastKey(key) {
    lastKey = key
}

function pianoSingleOctaveModule(octave, keyPressHooks = [], keyReleaseHooks = []) {
    let module = CreateEle('div', {class:"piano"})
    module.classList.add("piano")
    keyPressHooks.push(setLastKey)
    module.InsertEle(octaveModule(octave, 0, keyPressHooks, keyReleaseHooks))
    return module
}

function pianoModule(keyPressHooks = [], keyReleaseHooks = []) {
    let module = CreateEle('div')
    module.classList.add("piano")
    keyPressHooks.push((key) => lastKey = key)
    for (let o = 1; o <= 7; o++) {
        module.InsertEle(octaveModule(o, o - 1, keyPressHooks, keyReleaseHooks))
    }
    module.InsertEle(whiteKeyModule("C", 8))
    return module
}

function playNoteOnKeyPress() {
    // TODO simplify key logic
    if (currentPiano.classList.contains("piano")) {
        if (event.key == "a" && (keyIntialPress["a"] === undefined || keyIntialPress["a"])) {
            currentPiano.childNodes[0].childNodes[0].playKey()
        }
        if (event.key == "s" && (keyIntialPress["s"] === undefined || keyIntialPress["s"])) {
            currentPiano.childNodes[0].childNodes[1].playKey()
        }
        if (event.key == "d" && (keyIntialPress["d"] === undefined || keyIntialPress["d"])) {
            currentPiano.childNodes[0].childNodes[2].playKey()
        }
        if (event.key == "f" && (keyIntialPress["f"] === undefined || keyIntialPress["f"])) {
            currentPiano.childNodes[0].childNodes[3].playKey()
        }
        if (event.key == "g" && (keyIntialPress["g"] === undefined || keyIntialPress["g"])) {
            currentPiano.childNodes[0].childNodes[4].playKey()
        }
        if (event.key == "h" && (keyIntialPress["h"] === undefined || keyIntialPress["h"])) {
            currentPiano.childNodes[0].childNodes[5].playKey()
        }
        if (event.key == "j" && (keyIntialPress["j"] === undefined || keyIntialPress["j"])) {
            currentPiano.childNodes[0].childNodes[6].playKey()
        }
        if (event.key == "w" && (keyIntialPress["w"] === undefined || keyIntialPress["w"])) {
            currentPiano.childNodes[0].childNodes[7].playKey()
        }
        if (event.key == "e" && (keyIntialPress["e"] === undefined || keyIntialPress["e"])) {
            currentPiano.childNodes[0].childNodes[8].playKey()
        }
        if (event.key == "t" && (keyIntialPress["t"] === undefined || keyIntialPress["t"])) {
            currentPiano.childNodes[0].childNodes[9].playKey()
        }
        if (event.key == "y" && (keyIntialPress["y"] === undefined || keyIntialPress["y"])) {
            currentPiano.childNodes[0].childNodes[10].playKey()
        }
        if (event.key == "u" && (keyIntialPress["u"] === undefined || keyIntialPress["u"])) {
            currentPiano.childNodes[0].childNodes[11].playKey()
        }
        keyIntialPress[event.key] = false
    }
}
