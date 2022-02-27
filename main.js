//used https://github.com/fuhton/piano-mp3

let header
let toolbar
let content

const notes = "CDEFGAB"
const sharpNotes = ["Db","Eb","Gb","Ab","Bb"]
let title = "Notes"
let currentPiano
let lastKey
let keyIntialPress = {}

let keyCounter = 0
let timeCounter = 0

function loadScripts() {}

loadScripts()

window.onload = function() {
    setupCore()
    setupContent()
}

function setupCore() {
    document.title = title
    header = CreateEle('div', {id:"header", innerText:title})
    content = CreateEle('div', {id:"content"})

    InsertEles(document.body, [header, content])
}

function setupContent() {
    document.onkeydown = () => playNoteOnKeyPress()
    document.onkeyup = relaseKey
    content.InsertEle(randomNoteModule())
    currentPiano = pianoSingleOctaveModule(4)
    content.InsertEle(currentPiano)
    content.InsertEle(pianoSingleOctaveModule(7))
    content.InsertEle(pianoModule())
}

function pianoSingleOctaveModule(octave) {
    let module = CreateEle('div')
    module.InsertEle(pianoOctaveModule(octave))
    return module
}

function pianoOctaveModule(octave, set = 0) {
    let module = CreateEle('span')
    for (let n = 0; n < notes.length; n++) {
        module.InsertEle(whiteKeyModule(notes[n], octave))
    }
    let off = 8.7 + 13.4 + 0.68
    let startingOff = 0
    let count = 1
    for (let n = 0; n < sharpNotes.length; n++) {
        if (n / 2 == 1) {
            ++count
        }
        module.InsertEle(blackKeyModule(sharpNotes[n], octave, (((set * 7) + count)  * off) + startingOff))
        count++
    }
    return module
}

function pianoModule() {
    let module = CreateEle('div')
    let off = 8.7 + 13.4 + 0.68
    let count = 0
    for (let o = 1; o <= 7; o++) {
        module.InsertEle(pianoOctaveModule(o, o - 1 ))
    }
    module.InsertEle(whiteKeyModule("C", 8))

    return module
}

function whiteKeyModule(letter, octave) {
    let module = keyModule(letter, octave)
    module.style.padding = "55.6px 9.4px"
    module.style.display = "inline-block"
    module.style.boarder = "2px solid black"
    module.style.backgroundColor = "white"
    return module
}

function blackKeyModule(letter, octave, left) {
    let module = keyModule(letter, octave)
    module.style.padding = "36.7px 4.7px"
    module.style.position = "absolute"
    module.style.boarder = "2px solid black"
    module.style.zIndex = "1"
    module.style.left = left+"px"

    module.style.backgroundColor = "black"
    return module
}

function keyModule(letter, octave) {
    let module = CreateEle('button', {onmousedown: () => playNoteOnMousePress(letter, octave),
        onmouseover: () => playNoteOnMousePress(letter, octave),
        onmouseup: relaseKey, onmouseleave: relaseKey})
    module.letter = letter
    module.octave = octave
    module.playKey = function() {
        this.style.borderStyle = "inset"
        lastKey = this
        playNote(this.letter, this.octave)
    }
    module.releaseKey = function() {
        this.style.borderStyle = "outset"
    }
    return module
}

function relaseKey() {
    event.stopPropagation();
    if (lastKey) {
        lastKey.releaseKey()
    }
    if (event.key) {
        keyIntialPress[event.key] = true
    }
}

function playNoteOnKeyPress() {
    // TODO change DIV to class piano
    // TODO simplify key logic
    if (currentPiano.nodeName == "DIV") {
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
        ++keyCounter
        checkKey()
    }
}

function checkKey() {
    noteOutput = document.getElementById("notetext")
    scoreOutput = document.getElementById("scoretext")

    if(lastKey.letter == noteOutput.innerText) {
        console.log(Date.now() +" "+ timeCounter);
        let time = (Date.now() - timeCounter) / 1000
        scoreOutput.innerText = "(Keys Presed " + keyCounter + ". Time " + time +"s)"

        keyCounter = 0
        timeCounter = Date.now()
        setTimeout(() => setNoteOutput(noteOutput), 1000)
    }
}

function playNoteOnMousePress(letter, octave) {
    event.stopPropagation();
    currentPiano = event.target.parentElement.parentElement
    if (event.buttons > 0) {
        event.target.playKey()
        ++keyCounter
        checkKey()
    }
}

function randomNoteModule() {
    let module = CreateEle('div', {class:"randomnote"})
    let noteOutput = CreateEle("div", {id:"notetext"})
    let scoreOutput = CreateEle("span", {id:"scoretext"})
    module.InsertEle(CreateEle("button", {innerText:"Random Note", onclick: () => setNoteOutput(noteOutput)}))
    module.InsertEle(noteOutput)
    module.InsertEle(scoreOutput)
    return module
}

function setNoteOutput(noteOutput) {
    let noteLetter = generateNote()
    noteOutput.innerText = noteLetter
    playNote(noteLetter, 4)
}

function generateNote() {
    let note = notes[Math.floor(Math.random() * notes.length)]
    keyCounter = 0
    timeCounter = Date.now()
    return note
}

function playNote(letter, octave) {
    playSound("sounds/piano/" + letter + octave +".mp3")
}

function playSound(file) {
    const audio = new Audio(file);
    audio.play();
}
