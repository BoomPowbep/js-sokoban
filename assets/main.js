document.addEventListener('DOMContentLoaded', () => {
    console.log('=== Sokoban Game by Mickaël Debalme ===')
    console.log('           www.debalme.dev')
    console.log('    mickael.debalme@edu.gobelins.fr')
    console.log('')
    console.log('Graphical assets: https://www.kenney.nl/assets/sokoban')
    console.log('Music: Eric Skiff - Jumpshot - Resistor Anthems - http://EricSkiff.com/music')
    console.log('GitHub: https://github.com/BoomPowbep/js-sokoban')
    console.log('')
    const game = new Game()
    document.addEventListener('gameReady', () => {
        game.run()
    })
})
