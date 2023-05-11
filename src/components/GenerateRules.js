import paintCanvas from "./PaintCanvas"

function generateRules(canvasData, settings, setRules) {

    const ruleConatiner = document.getElementById("ruleContainer")
    ruleConatiner.innerHTML = ""
    const tiles = []
    const sides = {"up" : {}, "right" : {}, "down" : {}, "left" : {}}
    const frequency = []

    function generateSides(tile) {
        const index = frequency.length - 1
        const rows = tile[0]
        const columns = tile[1]

        sides.up[rows[0]] = [index].concat(getKey(sides.up, rows[0]))
        sides.down[rows[settings.y - 1]] = [index].concat(getKey(sides.down, rows[settings.y - 1]))
        sides.left[columns[0]] = [index].concat(getKey(sides.left, columns[0]))
        sides.right[columns[settings.x - 1]] = [index].concat(getKey(sides.right, columns[settings.x - 1]))        
    }

    function createCanvas(){
        const canvas = document.createElement("canvas")
        const canvasContainer = document.createElement("div")
        const frequencyText = document.createElement("h5")

        frequencyText.innerHTML = 1
        canvas.width = settings.x
        canvas.height = settings.y
        canvasContainer.append(canvas)
        canvasContainer.append(frequencyText)
        ruleConatiner.append(canvasContainer) 

        return canvas    
    }

    function forLoopRow(row) {
        for (let column = 0; column < canvasData.width - settings.y; column++) {
            const start = column + row * canvasData.width
            const newTile = generateTile(canvasData.data, start, canvasData.width, settings.x, settings.y)
            
            const tilePosition = getTilePosition(tiles, newTile[0])
            if (tilePosition === -1) {

                generateSides(newTile)
                const canvas = createCanvas()
                paintCanvas(canvas, newTile)

                frequency.push(1)
                tiles.push(newTile)
            } 
            else {
                const frequencyText = ruleConatiner.children[tilePosition].children[1]
                
                frequencyText.innerHTML = +frequencyText.innerHTML + 1
                frequency[tilePosition] += 1
            }                
        }

        row++
        if (row <= canvasData.height - settings.x){
            setTimeout(function(){
                forLoopRow(row)
            }, 1);                
        } else {
            // end point

            setRules({"tiles" : tiles, "settings" : settings, "sides" : sides, "frequency" : frequency})
        }
    }
   forLoopRow(0)
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