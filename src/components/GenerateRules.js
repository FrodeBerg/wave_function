const valuesPerPixel = 4

function generateRules(canvasData, settings) {

    const tiles = generateTiles(canvasData, settings)
    const rules = null // generateSideRules(tiles, settings)

    return {"tiles" : tiles, "settings" : settings, "rules" : rules}
}

function compareSides(side, oppositeSide) {

    if (side.byteLength !== oppositeSide.byteLength) return false;

    for (var i = 0 ; i !== side.byteLength ; i++)
    {
        if (side[i] !== oppositeSide[i]) return false;
    }
    return true;
}

function getSides(tile, width, height) {
    let length = width * height * valuesPerPixel

    const sides = {
        "up" : new Uint8ClampedArray(length), 
        "right" : new Uint8ClampedArray(length),  
        "down" : new Uint8ClampedArray(length), 
        "left" : new Uint8ClampedArray(length),
    }

    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            const pixelStart = (column + row * width) * valuesPerPixel
            const pixel = tile.slice(pixelStart, pixelStart + valuesPerPixel)
            if (row === 0) sides.up.set(pixel, column * valuesPerPixel)
            if (column === 2) sides.right.set(pixel, row * valuesPerPixel)
            if (row === 2) sides.down.set(pixel, column * valuesPerPixel)
            if (column === 0) sides.left.set(pixel, row * valuesPerPixel)  
        }
    }
    return sides
}

function generateSideRules(tiles, settings) {
    const rules = []
    const length = tiles.length
    for (let i = 0; i < length; i++) {
        const rule = {"up" : [], "right" : [],  "down" : [], "left" : [],}        
        rules.push(rule)        
    }

    for (let i = 0; i < length; i++) {
        const tile = tiles[i]
        const sides = getSides(tile, settings.x, settings.y)

        for (let j = i; j < length; j++) {
            const newTile = tiles[j]
            const newSides = getSides(newTile, settings.x, settings.y)

            if (compareSides(sides.left, newSides.right)) {
                rules[i].left.push(j)
                rules[j].right.push(i)

            }
            if (compareSides(sides.right, newSides.left)) {
                rules[i].right.push(j)
                rules[j].left.push(i)
            }
            if (compareSides(sides.up, newSides.down)){
                rules[i].up.push(j)
                rules[j].down.push(i)
            }
            if (compareSides(sides.down, newSides.up)) {
                rules[i].down.push(j)
                rules[j].up.push(i)
            }
        }
    }

    return rules
}

function generateTiles(canvasData, settings) {
    const tiles = []
    for (let row = 0; row <= canvasData.height - settings.x; row++){
        for (let column = 0; column <= canvasData.width - settings.y; column++) {

            let newArray = new Uint8ClampedArray(settings.y * settings.x * valuesPerPixel)
            for (let matrixRow = 0; matrixRow < settings.y; matrixRow++) {
                const pixelStart = (column + (matrixRow + row) * canvasData.width) 
                const pixelRow = canvasData.data.slice(pixelStart * valuesPerPixel, (pixelStart + settings.x) * valuesPerPixel)
                newArray.set(pixelRow, matrixRow * valuesPerPixel * settings.x)
            }
            
            tiles.push(newArray)
        }
    }

    return tiles
}

export default generateRules