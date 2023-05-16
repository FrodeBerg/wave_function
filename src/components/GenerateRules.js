import {paintCanvas, getKey} from "./helperFunctions"

function generateRules(tile, tiles, rules, frequenzy) {
    const isNewTile = getTilePosition(tiles, tile.data)

    
    if (isNewTile === -1) {
        const sides = generateSides(tile)
        addRules(tiles, rules, sides)

        tiles.push(tile.data)
        frequenzy.push(1)
        addToDOM(tile)
    } else {
        frequenzy[isNewTile] += 1
        const frequencyText = document.getElementById("ruleContainer").children[isNewTile]
        if (frequencyText) {
            const text = frequencyText.children[1]
            text.innerHTML = +text.innerHTML + 1
        }
    }
}

function addToDOM(tile){
    const ruleConatiner = document.getElementById("ruleContainer")
    const canvas = document.createElement("canvas")
    const canvasContainer = document.createElement("div")
    const frequencyText = document.createElement("h5")

    frequencyText.innerHTML = 1
    canvas.width = tile.width
    canvas.height = tile.height
    canvasContainer.append(canvas)
    canvasContainer.append(frequencyText)
    ruleConatiner.append(canvasContainer) 

    paintCanvas(canvas, tile.data)   
}


function getTilePosition(tileArray, tile) {
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

function generateSides(tile) {
    const valuesPerPixel = 4
    const width = tile.width * valuesPerPixel
    const height = tile.height 
    const data = tile.data

    const sides = {"up" : [], "down": [], "left" : new Uint8ClampedArray(height * valuesPerPixel), "right" : new Uint8ClampedArray(height * valuesPerPixel)}

    sides.up = data.slice(0, width)
    sides.down = data.slice((height - 1) * width, height * width)

    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {

            const rowStart = row * width
            if (!column) sides.left.set(data.slice(rowStart, rowStart + valuesPerPixel), row * valuesPerPixel) 
            if (column === width - 1) sides.right.set(data.slice(rowStart + width - valuesPerPixel, rowStart + width), row * valuesPerPixel)
        }
    }

    return sides 
}

function addRules(tiles, rules, sides) {
    const length = tiles.length

    Object.keys(sides).forEach((direction) => {
        const newValue = [length].concat(getKey(rules.sides[direction], sides[direction]))
        rules.sides[direction][sides[direction]] = newValue
    })

    rules.tiles.push(sides)
}



export default generateRules