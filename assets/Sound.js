class Sound {

    /**
     * Constructor.
     */
    constructor(pathToFile = '', autoPlay = false, waitForClick = true) {

        if (pathToFile !== '') this.loadFromFile(pathToFile, autoPlay, waitForClick)
    }

    /**
     * Loads a file from an audio file.
     * @param pathToFile
     * @param autoPlay Immediately start playing. Default to false.
     * @param waitForClick Waits for the user to click in the window to play the music. Default to true.
     */
    loadFromFile(pathToFile, autoPlay = false, waitForClick = true) {
        this.sound = document.createElement('audio')
        this.sound.src = pathToFile
        this.sound.setAttribute('preload', 'auto')
        this.sound.setAttribute('controls', 'none')
        this.sound.style.display = 'none'
        document.body.appendChild(this.sound)

        if(autoPlay) {
            if(waitForClick) {
                document.addEventListener('mousedown', () => { this.sound.play() })
            }
            else {
                this.sound.play()
            }
        }
    }

    /**
     * Plays the sound.
     */
    play() {
        this.sound.play()
    }

    /**
     * Pauses the sound.
     */
    pause() {
        this.sound.pause()
    }
}
