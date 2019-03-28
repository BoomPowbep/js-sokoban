const BLOCK_WIDTH = 50, BLOCK_HEIGHT = 50, NB_SIDE_BLOCKS = 12

const gameReady = document.createEvent('Event')
gameReady.initEvent('gameReady', true, true)

class Game {

    /**
     * Constructor.
     */
    constructor() {
        console.log('🕹 Starting Game')

        this.win = false

        // Elements of the game (struct)
        this._elements = {
            EMPTY: 0,
            WALL: 1,
            BOX: 2,
            BOX_OK: 3,
            GOAL: 4,
            PLAYER_DOWN: 5,
            PLAYER_UP: 6,
            PLAYER_LEFT: 7,
            PLAYER_RIGHT: 8
        }

        this._playerPos = {
            x: 2,
            y: 4
        }

        this._boxPos = {
            x: 9,
            y: 4
        }

        this._goalPos = {
            x: 9,
            y: 6
        }

        this._nextMove = ''

        // Register keyboard events
        this._registerEvents()

        // Init map array
        this._initMap()

        // Init _canvas
        this._createCanvas()

        // Load audio resources
        this._loadAudio()

        // Load graphical _assets
        this._loadAssets()

        // Create the first frame
        const assetsPromises = [
            new Promise((resolve, reject) => {
                this._assets.wall.onload = () => {
                    resolve()
                }
            }),
            new Promise((resolve, reject) => {
                this._assets.box.onload = () => {
                    resolve()
                }
            }),
            new Promise((resolve, reject) => {
                this._assets.box_ok.onload = () => {
                    resolve()
                }
            }),
            new Promise((resolve, reject) => {
                this._assets.goal.onload = () => {
                    resolve()
                }
            }),
            new Promise((resolve, reject) => {
                this._assets.player_down.onload = () => {
                    resolve()
                }
            }),
            new Promise((resolve, reject) => {
                this._assets.player_up.onload = () => {
                    resolve()
                }
            }),
            new Promise((resolve, reject) => {
                this._assets.player_left.onload = () => {
                    resolve()
                }
            }),
            new Promise((resolve, reject) => {
                this._assets.player_right.onload = () => {
                    resolve()
                }
            })
        ]

        Promise.all(assetsPromises).then(() => {
            console.log('🗿 Assets Loaded')
            this._fillCanvas()
            document.dispatchEvent(gameReady)
        })
    }

    /**
     * Registers keyboard events
     * @private
     */
    _registerEvents() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowUp': // Arrow up
                    this._nextMove = 'up'
                    break
                case 'ArrowDown': // Arrow down
                    this._nextMove = 'down'
                    break
                case 'ArrowLeft': // Arrow left
                    this._nextMove = 'left'
                    break
                case 'ArrowRight': // Arrow right
                    this._nextMove = 'right'
                    break
                case 'Escape': // Escape
                    this._pauseSound.play()
                    break
            }
        })
    }

    /**
     * Creates the map
     * @private
     */
    _initMap() {
        // Array containing the map of the level
        this._map = [
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.EMPTY, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.EMPTY, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.EMPTY, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.EMPTY, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.EMPTY, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.EMPTY, this._elements.EMPTY, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.EMPTY, this._elements.EMPTY, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.EMPTY, this._elements.EMPTY, this._elements.EMPTY, this._elements.EMPTY, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL),
            Array(this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL, this._elements.WALL)
        ]
        this._map[this._playerPos.x][this._playerPos.y] = this._elements.PLAYER_DOWN
        this._map[this._boxPos.x][this._boxPos.y] = this._elements.BOX
        this._map[this._goalPos.x][this._goalPos.y] = this._elements.GOAL
        console.log('🗺 Map Layout Loaded')
    }

    /**
     * Creates and fills the _canvas with default color.
     * @private
     */
    _createCanvas() {
        this._canvas = document.createElement('canvas')
        this._canvas.width = BLOCK_WIDTH * NB_SIDE_BLOCKS
        this._canvas.height = BLOCK_HEIGHT * NB_SIDE_BLOCKS
        document.body.appendChild(this._canvas)
        this._ctx = this._canvas.getContext('2d')

        // White Background
        this._ctx.beginPath()
        this._ctx.rect(0, 0, BLOCK_WIDTH * NB_SIDE_BLOCKS, BLOCK_HEIGHT * NB_SIDE_BLOCKS)
        this._ctx.fillStyle = '#ffffff'
        this._ctx.fill()

    }

    _loadAudio() {
        this._winSound = new Sound('sound/win.wav')
        this._stepSound = new Sound('sound/step.wav')
        this._pauseSound = new Sound('sound/pause.wav')
    }

    /**
     * Loads the _assets.
     * @private
     */
    _loadAssets() {
        this._assets = {
            wall: new Image(),
            box: new Image(),
            box_ok: new Image(),
            goal: new Image(),
            player_up: new Image(),
            player_down: new Image(),
            player_left: new Image(),
            player_right: new Image(),
        }

        this._assets.wall.src = 'images/Retina/Blocks/block_07.png'
        this._assets.box.src = 'images/Retina/Crates/crate_07.png'
        this._assets.box_ok.src = 'images/Retina/Crates/crate_42.png'
        this._assets.goal.src = 'images/Retina/Environment/environment_03.png'
        this._assets.player_down.src = 'images/Retina/Player/player_03.png'
        this._assets.player_up.src = 'images/Retina/Player/player_06.png'
        this._assets.player_left.src = 'images/Retina/Player/player_18.png'
        this._assets.player_right.src = 'images/Retina/Player/player_15.png'
    }

    /**
     * Fills the _canvas with the map.
     * @private
     */
    _fillCanvas() {
        for (let i = 0; i < NB_SIDE_BLOCKS; i++) {
            for (let j = 0; j < NB_SIDE_BLOCKS; j++) {
                this._ctx.beginPath()
                let element
                switch (this._map[i][j]) {
                    case this._elements.WALL:
                        element = this._assets.wall
                        break
                    case this._elements.BOX:
                        element = this._assets.box
                        break
                    case this._elements.BOX_OK:
                        element = this._assets.box_ok
                        break
                    case this._elements.PLAYER_DOWN:
                        element = this._assets.player_down
                        break
                    case this._elements.PLAYER_UP:
                        element = this._assets.player_up
                        break
                    case this._elements.PLAYER_LEFT:
                        element = this._assets.player_left
                        break
                    case this._elements.PLAYER_RIGHT:
                        element = this._assets.player_right
                        break
                    case this._elements.GOAL:
                        element = this._assets.goal
                        break
                    case this._elements.EMPTY:
                        element = new Image() // Transparent empty image
                        break
                }
                this._ctx.drawImage(element, j * BLOCK_WIDTH, i * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT)
            }
        }
    }

    /**
     * Game loop.
     */
    run() {
        this._ctx.clearRect(0, 0, BLOCK_WIDTH * NB_SIDE_BLOCKS, BLOCK_HEIGHT * NB_SIDE_BLOCKS)
        this._updateControls()
        this._renderFrame()
        if(!this.win) {
            window.requestAnimationFrame(this.run.bind(this))
        }
        else {
            console.log('Win!')
        }
    }

    _moveUp() {
        if (this._map[this._playerPos.x - 1][this._playerPos.y] === this._elements.EMPTY) {

            this._map[this._playerPos.x][this._playerPos.y] = this._elements.EMPTY
            this._playerPos.x -= 1
            this._stepSound.play()

        } else if (this._map[this._playerPos.x - 1][this._playerPos.y] === this._elements.BOX
            && (this._map[this._playerPos.x - 2][this._playerPos.y] === this._elements.EMPTY
                || this._map[this._playerPos.x - 2][this._playerPos.y] === this._elements.GOAL)) {

            this._map[this._playerPos.x][this._playerPos.y] = this._elements.EMPTY
            this._map[this._boxPos.x][this._boxPos.y] = this._elements.EMPTY
            this._playerPos.x -= 1
            this._boxPos.x -= 1
            this._stepSound.play()
        }

        this._map[this._playerPos.x][this._playerPos.y] = this._elements.PLAYER_UP
    }

    _moveDown() {
        if (this._map[this._playerPos.x + 1][this._playerPos.y] === this._elements.EMPTY) {

            this._map[this._playerPos.x][this._playerPos.y] = this._elements.EMPTY
            this._playerPos.x += 1
            this._stepSound.play()

        } else if (this._map[this._playerPos.x + 1][this._playerPos.y] === this._elements.BOX
            && (this._map[this._playerPos.x + 2][this._playerPos.y] === this._elements.EMPTY
                || this._map[this._playerPos.x + 2][this._playerPos.y] === this._elements.GOAL)) {

            this._map[this._playerPos.x][this._playerPos.y] = this._elements.EMPTY
            this._map[this._boxPos.x][this._boxPos.y] = this._elements.EMPTY
            this._playerPos.x += 1
            this._boxPos.x += 1
            this._stepSound.play()
        }

        this._map[this._playerPos.x][this._playerPos.y] = this._elements.PLAYER_DOWN
    }

    _moveLeft() {
        if (this._map[this._playerPos.x][this._playerPos.y - 1] === this._elements.EMPTY) {

            this._map[this._playerPos.x][this._playerPos.y] = this._elements.EMPTY
            this._playerPos.y -= 1
            this._stepSound.play()

        } else if (this._map[this._playerPos.x][this._playerPos.y - 1] === this._elements.BOX
            && (this._map[this._playerPos.x][this._playerPos.y - 2] === this._elements.EMPTY
                || this._map[this._playerPos.x][this._playerPos.y - 2] === this._elements.GOAL)) {

            this._map[this._playerPos.x][this._playerPos.y] = this._elements.EMPTY
            this._map[this._boxPos.x][this._boxPos.y] = this._elements.EMPTY
            this._playerPos.y -= 1
            this._boxPos.y -= 1
            this._stepSound.play()
        }

        this._map[this._playerPos.x][this._playerPos.y] = this._elements.PLAYER_LEFT
    }

    _moveRight() {
        if (this._map[this._playerPos.x][this._playerPos.y + 1] === this._elements.EMPTY) {

            this._map[this._playerPos.x][this._playerPos.y] = this._elements.EMPTY
            this._playerPos.y += 1
            this._stepSound.play()

        } else if (this._map[this._playerPos.x][this._playerPos.y + 1] === this._elements.BOX
            && (this._map[this._playerPos.x][this._playerPos.y + 2] === this._elements.EMPTY
                || this._map[this._playerPos.x][this._playerPos.y + 2] === this._elements.GOAL)) {

            this._map[this._playerPos.x][this._playerPos.y] = this._elements.EMPTY
            this._map[this._boxPos.x][this._boxPos.y] = this._elements.EMPTY
            this._playerPos.y += 1
            this._boxPos.y += 1
            this._stepSound.play()
        }

        this._map[this._playerPos.x][this._playerPos.y] = this._elements.PLAYER_RIGHT
    }

    /**
     * Controls update.
     * @private
     */
    _updateControls() {
        if (this._nextMove !== '') {
            switch (this._nextMove) {
                case 'up':
                    this._moveUp()
                    break;
                case 'down':
                    this._moveDown()
                    break;
                case 'left':
                    this._moveLeft()
                    break;
                case 'right':
                    this._moveRight()
                    break;
            }
            if (this._boxPos.x === this._goalPos.x && this._boxPos.y === this._goalPos.y) { // win
                this._map[this._boxPos.x][this._boxPos.y] = this._elements.BOX_OK
                this._winSound.play()
                this.win = true
            } else {
                this._map[this._boxPos.x][this._boxPos.y] = this._elements.BOX
            }
            this._nextMove = ''
        }
    }

    /**
     * Updates the current frame.
     * @private
     */
    _renderFrame() {

        // Draw
        this._fillCanvas()
    }
}
