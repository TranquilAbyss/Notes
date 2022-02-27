//used https://github.com/fuhton/piano-mp3

let header
let toolbar
let content

let title = "Notes"

let keyCounter = 0
let timeCounter = 0

function loadScripts() {
    LoadScript("module/piano/key.js")
    LoadScript("module/piano/whitekey.js")
    LoadScript("module/piano/blackkey.js")
    LoadScript("module/piano/octave.js")
    LoadScript("module/piano/piano.js")
}

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
    content.InsertEle(randomNoteModule())
    currentPiano = pianoSingleOctaveModule(4, [scoreKeyPress])
    content.InsertEle(currentPiano)
    content.InsertEle(pianoSingleOctaveModule(7, [scoreKeyPress]))
    content.InsertEle(pianoModule([scoreKeyPress]))
}

function checkKey(key) {
    noteOutput = document.getElementById("notetext")
    scoreOutput = document.getElementById("scoretext")

    if(key.letter == noteOutput.innerText) {
        let time = (Date.now() - timeCounter) / 1000
        scoreOutput.innerText = "(Keys Presed " + keyCounter + ". Time " + time +"s)"

        keyCounter = 0
        timeCounter = Date.now()
        setTimeout(() => setNoteOutput(noteOutput), 1000)
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
    let notes = currentPiano.childNodes[0].notes
    let note = notes[Math.floor(Math.random() * notes.length)]
    keyCounter = 0
    timeCounter = Date.now()
    return note
}

function scoreKeyPress(key) {
    ++keyCounter
    checkKey(key)
}
