//used https://github.com/fuhton/piano-mp3

let header
let toolbar
let content

let title = "Notes"

let keyCounter = 0
let timeCounter = 0

let practicePiano

function loadScripts() {
    LoadScript("module/piano/key.js")
    LoadScript("module/piano/whitekey.js")
    LoadScript("module/piano/blackkey.js")
    LoadScript("module/piano/octave.js")
    LoadScript("module/piano/piano.js")

    LoadScript("module/pages/toolbar.js")
    LoadScript("module/pages/page.js")
}

loadScripts()

window.onload = function() {
    setupCore()
    setupContent()
}

function setupCore() {
    document.title = title
    header = CreateEle('div', {id:"header"})
    header.InsertEle(CreateEle('h1', {innerText:title}))
    toolbar = ToolbarModule()
    content = CreateEle('div', {id:"content"})

    InsertEles(document.body, [header, toolbar, content])
}

function setupContent() {
    let homePage = HomePageModule()
    let leanKeysPage = LearnKeysPageModule()
    let practiceKeysPage = PracticeKeysPageModule()
    content.InsertEles([homePage, leanKeysPage, practiceKeysPage])
}

function HomePageModule() {
    module = PageModule("Home")
    toolbar.addPage(module)
    module.InsertEle(CreateEle('h2', {innerText: "Home"}))
    let description = CreateEle('p')
    description.innerText = "This site will help you learn the piano.\n" +
    "Controls:\n" +
    "- Mouse: Left or right click on keys to play\n" +
    "- Keyboard: Leave mouse on a piano and press keys:\n C:\"A\"\nD:\"S\"\nE:\"D\"\nF:\"F\"\nG:\"G\"\nA:\"H\"\nB:\"J\"\n Db:\"W\"\nEb:\"E\"\nGb:\"T\"\nAb:\"Y\"\nBb:\"U\"\n" +
    "Change octaves by prssing the \"Z\" and \"X\""
    module.InsertEle(description)
    module.InsertEle(pianoModule())
    return module
}

function LearnKeysPageModule() {
    module = PageModule("Learn Keys")
    toolbar.addPage(module)
    module.InsertEle(CreateEle('h2', {innerText: "Learn Keys"}))
    module.InsertEle(CreateEle('P', {innerText: "External Links:"}))
    module.InsertEle(CreateEle('a', {href: "https://www.piano-lessons-info.com/piano-key-notes.html", innerText: "https://www.piano-lessons-info.com/piano-key-notes.html", target:"_blank", rel:"noopener noreferrer"}))
    module.InsertEle(CreateEle('br'))
    module.InsertEle(CreateEle('a', {href: "https://www.piano-lessons-info.com/piano-music-notes-quiz.html", innerText: "https://www.piano-lessons-info.com/piano-music-notes-quiz.html", target:"_blank", rel:"noopener noreferrer"}))
    return module
}

function PracticeKeysPageModule() {
    module = PageModule("Practice Keys")
    toolbar.addPage(module)
    module.InsertEle(CreateEle('h2', {innerText: "Practice Keys"}))
    let description = CreateEle('p')
    description.innerText = "Practice finding the correct key, start by clicking Random Note.\n"+
    "A note letter will appear, and a sound will play. If you can match the note, then a new note will play automatically.\n"+
    "Playing with the keyboard is recommended.\n\n" +
    "Goal: Practice muscle memory pressing the correct key. Then reduce time between presses.\n" +
    "Tip: Try not to think where the key is, let your fingers guess until they improve.\n" +
    "Challenge: Try playing with your eyes closed and see if you can guess the key letter by sound."
    module.InsertEle(description)
    module.InsertEle(randomNoteModule())
    practicePiano = pianoSingleOctaveModule(4, [scoreKeyPress])
    module.InsertEle(practicePiano)
    return module
}

function checkKey(key) {
    noteOutput = document.getElementById("notetext")
    scoreOutput = document.getElementById("scoretext")

    if(key.letter == noteOutput.innerText) {
        let time = (Date.now() - timeCounter) / 1000
        if (keyCounter == 1) {
            scoreOutput.innerText = "(Correct Key! Time " + time +"s)"
        } else {
            scoreOutput.innerText = "(Wrong Keys " + (keyCounter - 1) + ". Time " + time +"s)"
        }
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
    currentPiano = practicePiano
    let noteLetter = generateNote()
    noteOutput.innerText = noteLetter
    playNote(noteLetter, 4)
}

function generateNote() {
    let notes = practicePiano.childNodes[0].notes
    let note = notes[Math.floor(Math.random() * notes.length)]
    keyCounter = 0
    timeCounter = Date.now()
    return note
}

function scoreKeyPress(key) {
    ++keyCounter
    checkKey(key)
}
