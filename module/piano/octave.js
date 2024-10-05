function octaveModule(octave, set = 0, keyPressHooks = [], keyReleaseHooks = []) {
    let module = CreateEle('span')
    //TODO imporve positions white keys when window is small
    module.octave = octave
    module.notes = "CDEFGAB"
    module.sharpNotes = ["Db","Eb","Gb","Ab","Bb"]
    for (let n = 0; n < module.notes.length; n++) {
        module.InsertEle(whiteKeyModule(module.notes[n], octave, keyPressHooks, keyReleaseHooks))
    }
    //TODO improve spacing with actual element sizes
    let off = 8.7 + 13.4 + 0.68
    let startingOff = 0
    let count = 1
    for (let n = 0; n < module.sharpNotes.length; n++) {
        if (n / 2 == 1) {
            ++count
        }
        module.InsertEle(blackKeyModule(module.sharpNotes[n], octave, (((set * 7) + count)  * off) + startingOff, keyPressHooks, keyReleaseHooks))
        count++
    }
    return module
}

function octaveCModule(octave, keyPressHooks = [], keyReleaseHooks = []) {
    let module = CreateEle('span')
    module.octave = octave
    module.notes = "C"
    for (let n = 0; n < module.notes.length; n++) {
        module.InsertEle(whiteKeyModule(module.notes[n], octave, keyPressHooks, keyReleaseHooks))
    }
    return module
}
