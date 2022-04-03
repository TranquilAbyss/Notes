function keyModule(letter, octave, keyPressHooks = [], keyReleaseHooks = []) {
    let module = CreateEle('button', {class: "pianokey"})
    module.letter = letter
    module.octave = octave
    module.keyPressHooks = keyPressHooks
    module.keyReleaseHooks = keyReleaseHooks
    module.audio = new Audio(getSoundFile(letter, octave));
    module.intialPress = true
    module.playKey = function() {
        this.style.borderStyle = "inset"
        playAudio(getSoundFile(this.letter, this.octave), this.audio)
        if (this.keyPressHooks.length > 0) {
            this.keyPressHooks.forEach((keyHook) => keyHook(this))
        }
    }
    module.playHotKey = function(letter) {
        if (letter == this.hotKey && letter != undefined) {
            if (this.intialPress) {
                this.style.borderStyle = "inset"
                playAudio(getSoundFile(this.letter, this.octave), this.audio)
                if (this.keyPressHooks.length > 0) {
                    this.keyPressHooks.forEach((keyHook) => keyHook(this))
                }
            }
            this.intialPress = false
        }
    }
    module.releaseKey = function() {
        this.style.borderStyle = "outset"
        //TODO short fade out instead of pause.
        this.audio.pause()
        if (this.keyPressHooks.length > 0) {
            this.keyReleaseHooks.forEach((keyHook) => keyHook(this))
        }
    }
    module.releaseHotKey = function(letter) {
        if (letter == this.hotKey && letter != undefined) {
            this.style.borderStyle = "outset"
            this.audio.pause()
            this.intialPress = true
            if (this.keyPressHooks.length > 0) {
                this.keyReleaseHooks.forEach((keyHook) => keyHook(this))
            }
        }
    }
    module.onmousedown = () => playNoteOnMousePress(letter, octave)
    module.onmouseover = () => playNoteOnMousePress(letter, octave)
    module.onmouseup = () => module.releaseKey()
    module.onmouseleave = () => module.releaseKey()

    return module
}

function getSoundFile(letter, octave) {
    return "module/piano/sounds/" + letter + octave +".mp3"
}

function playNote(letter, octave) {
    playSound(getSoundFile(letter, octave))
}

function playSound(file) {
    let audio = new Audio(file)
    audio.play()
}

function playAudio(file, audio) {
    audio.src = file
    audio.play()
}

function playNoteOnMousePress(letter, octave) {
    if (event.buttons > 0) {
        event.target.playKey()
    }
}
