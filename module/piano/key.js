function keyModule(letter, octave, keyPressHooks = [], keyReleaseHooks = []) {
    let module = CreateEle('button', {class: "pianokey"})
    module.letter = letter
    module.octave = octave
    module.keyPressHooks = keyPressHooks
    module.keyReleaseHooks = keyReleaseHooks
    module.playKey = function() {
        this.style.borderStyle = "inset"
        playNote(this.letter, this.octave)
        if (this.keyPressHooks.length > 0) {
            this.keyPressHooks.forEach((keyHook) => keyHook(this))
        }
    }
    module.releaseKey = function() {
        this.style.borderStyle = "outset"
        if (this.keyPressHooks.length > 0) {
            this.keyReleaseHooks.forEach((keyHook) => keyHook(this))
        }
    }
    module.onmousedown = () => playNoteOnMousePress(letter, octave)
    module.onmouseover = () => playNoteOnMousePress(letter, octave)
    module.onmouseup = () => module.releaseKey()
    module.onmouseleave = () => module.releaseKey()

    return module
}
function playNote(letter, octave) {
    playSound("module/piano/sounds/" + letter + octave +".mp3")
}

function playSound(file) {
    const audio = new Audio(file);
    audio.play();
}

function playNoteOnMousePress(letter, octave) {
    if (event.buttons > 0) {
        event.target.playKey()
    }
}
