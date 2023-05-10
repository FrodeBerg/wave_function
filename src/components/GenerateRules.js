const valuesPerPixel = 4

function generateRules(canvasData, settings) {

    const [tiles, frequency] = generateTiles(canvasData, settings)
    const rules = null
    console.log(rules)
    return {"tiles" : tiles, "settings" : settings, "rules" : rules, "frequency" : frequency}
}

function geTilePosition(tileArray, tile) {

    for (let i = 0; i < tileArray.length; i++) {
        let compareTile = tileArray[i]
        let unique = false
        for (let j = 0; j < compareTile.length; j++) {
            if (tile[j] !== compareTile[j]) {
            unique = true
            break
        }
        }
        if (!unique) return i
    }
    return -1
}

function generateTiles(canvasData, settings) {
    const tiles = []
    const frequency = []
    for (let row = 0; row <= canvasData.height - settings.x; row++){
        for (let column = 0; column <= canvasData.width - settings.y; column++) {

            let newTile = new Uint8ClampedArray(settings.y * settings.x * valuesPerPixel)
            for (let matrixRow = 0; matrixRow < settings.y; matrixRow++) {
                const pixelStart = (column + (matrixRow + row) * canvasData.width) 
                const pixelRow = canvasData.data.slice(pixelStart * valuesPerPixel, (pixelStart + settings.x) * valuesPerPixel)
                newTile.set(pixelRow, matrixRow * valuesPerPixel * settings.x)
            }
            
            const tilePosition = geTilePosition(tiles, newTile)
            if (tilePosition === -1) {
                frequency.push(1)
                tiles.push(newTile)
            } 
            else {
                frequency[tilePosition] += 1
            }
        }
    }

    return [tiles, frequency]
}

export default generateRules