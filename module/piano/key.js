function keyModule(letter, octave, keyPressHooks = [], keyReleaseHooks = []) {
    let module = CreateEle('button', {class: "pianokey"})
    module.letter = letter
    module.octave = octave
    module.keyPressHooks = keyPressHooks
    module.keyReleaseHooks = keyReleaseHooks
    module.audio = new Audio(getSoundFile(letter, octave))
    module.mediaElementSource = window.AudioContext.createMediaElementSource(module.audio)
    module.gainNode = window.AudioContext.createGain()
    module.intialPress = true
    module.keyGainFade = 0.02
    module.mediaElementSource.connect(module.gainNode)
    module.gainNode.connect(window.AudioContext.destination)
    
    module.playKey = function() {
        this.style.borderStyle = "inset"
        this.gainNode.gain.value = 1
        playAudio(getSoundFile(this.letter, this.octave), this.audio)
        if (this.keyPressHooks.length > 0) {
            this.keyPressHooks.forEach((keyHook) => keyHook(this))
        }
    }
    module.playHotKey = function(letter) {
        if (letter == this.hotKey && letter != undefined) {
            if (this.intialPress) {
                this.style.borderStyle = "inset"
                this.gainNode.gain.value = 1
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
        let timer = setInterval(function () {
            gainFade(module, timer)
        })
        if (this.keyPressHooks.length > 0) {
            this.keyReleaseHooks.forEach((keyHook) => keyHook(this))
        }
    }
    module.releaseHotKey = function(letter) {
        if (letter == this.hotKey && letter != undefined) {
            this.style.borderStyle = "outset"
            let timer = setInterval(function () {
                gainFade(module, timer)
            })
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

function gainFade(key, timer) 
{
    let gain = key.gainNode.gain.value - key.keyGainFade
    key.gainNode.gain.value = gain;
    if (key.gainNode.gain.value <= 0.1) {
        key.audio.pause()
        clearInterval(timer);
    }
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
