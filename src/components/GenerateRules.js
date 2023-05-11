function generateRules(canvasData, settings) {

    const tiles = []
    const sides = {"up" : {}, "right" : {}, "down" : {}, "left" : {}}
    const frequency = []



    for (let row = 0; row <= canvasData.height - settings.x; row++){
        for (let column = 0; column <= canvasData.width - settings.y; column++) {

            const start = column + row * canvasData.width
            const newTile = generateTile(canvasData.data, start, canvasData.width, settings.x, settings.y)
            
            const tilePosition = getTilePosition(tiles, newTile[0])
            if (tilePosition === -1) {

                sides.up[newTile[0][0]] = [frequency.length].concat(getKey(sides.up, newTile[0][0]))
                sides.down[newTile[0][newTile[0].length - 1]] = [frequency.length].concat(getKey(sides.down, newTile[0][newTile[0].length - 1]))
                sides.left[newTile[1][0]] = [frequency.length].concat(getKey(sides.left, newTile[1][0]))
                sides.right[newTile[1][newTile[1].length - 1]] = [frequency.length].concat(getKey(sides.right, newTile[1][newTile[1].length - 1]))

                frequency.push(1)
                tiles.push(newTile)
            } 
            else {
                frequency[tilePosition] += 1
            }
        }
    }
    console.log(sides)
    return {"tiles" : tiles, "settings" : settings, "sides" : sides, "frequency" : frequency}
}

function getKey(object, key, returnValue = []) {
    if (object.hasOwnProperty(key)) return object[key]
    return returnValue 
}

function generateTile(data, start, canvasWidth, tileWidth, tileHeight) {

    const valuesPerPixel = 4
    const rows = []
    const columns = []

    for (let rowNumber = 0; rowNumber < tileHeight; rowNumber++) {
        const rowStart = (start + canvasWidth * rowNumber) * valuesPerPixel
        const row = data.slice(rowStart, rowStart + tileWidth * valuesPerPixel)
        const tileRow = new Uint8ClampedArray(row)
        rows.push(tileRow)
    }

    for (let columnNumber = 0; columnNumber < tileWidth; columnNumber++){
        const newColumn = new Uint8ClampedArray(tileHeight * valuesPerPixel)
        for (let rowNumber = 0; rowNumber < tileHeight; rowNumber++) {
            const rowValue = rows[rowNumber].slice(columnNumber * valuesPerPixel, columnNumber * valuesPerPixel + valuesPerPixel)
            newColumn.set(rowValue, rowNumber * valuesPerPixel)
        }
        columns.push(newColumn)
    }
    
    return [rows, columns]
}

function getTilePosition(tileArray, tile) {

    for (let i = 0; i < tileArray.length; i++) {

        let compareTile = tileArray[i][0]
        let unique = false

        for (let row = 0; row < compareTile.length; row++){
            for (let j = 0; j < compareTile[row].length; j++) {
                if (tile[row][j] !== compareTile[row][j]) {
                    unique = true
                    break
                }
            } 
        }
        if (!unique) return i   
    }
    return -1
}

export default generateRules