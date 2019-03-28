class Sound {

    /**
     * Constructor.
     */
    constructor(pathToFile = '', autoPlay = false) {

        if (pathToFile !== '') this.loadFromFile(pathToFile, autoPlay)
    }

    loadFromFile(pathToFile, autoPlay = false) {
        this.sound = document.createElement('audio')
        this.sound.src = pathToFile
        this.sound.setAttribute('preload', 'auto')
        this.sound.setAttribute('controls', 'none')
        this.sound.style.display = 'none'
        document.body.appendChild(this.sound)

        if(autoPlay) this.sound.play()
    }

    play() {
        this.sound.play()
    }

    pause() {
        this.sound.pause()
    }
}
