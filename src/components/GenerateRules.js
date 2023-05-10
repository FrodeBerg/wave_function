const valuesPerPixel = 4

function generateRules(canvasData, settings) {

    const tiles = generateTiles(canvasData, settings)
    const rules = null
    console.log(rules)
    return {"tiles" : tiles, "settings" : settings, "rules" : rules}
}

function isUniqueTile(tileArray, tile) {

    for (let i = 0; i < tileArray.length; i++) {
        let compareTile = tileArray[i]
        let unique = false
        for (let j = 0; j < compareTile.length; j++) {
            if (tile[j] !== compareTile[j]) {
            unique = true
            break
        }
        }
        if (!unique) return false
    }
    return true
}

function generateTiles(canvasData, settings) {
    const tiles = []
    for (let row = 0; row <= canvasData.height - settings.x; row++){
        for (let column = 0; column <= canvasData.width - settings.y; column++) {

            let newTile = new Uint8ClampedArray(settings.y * settings.x * valuesPerPixel)
            for (let matrixRow = 0; matrixRow < settings.y; matrixRow++) {
                const pixelStart = (column + (matrixRow + row) * canvasData.width) 
                const pixelRow = canvasData.data.slice(pixelStart * valuesPerPixel, (pixelStart + settings.x) * valuesPerPixel)
                newTile.set(pixelRow, matrixRow * valuesPerPixel * settings.x)
            }
            
            if (isUniqueTile(tiles, newTile)) tiles.push(newTile)
        }
    }

    return tiles
}

export default generateRules