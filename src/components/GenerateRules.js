const valuesPerPixel = 4

function generateRules(canvasData, settings) {

    const tiles = generateTiles(canvasData, settings)
    const rules = []
    // generate array of obj
    //each obj has left, right, up and down '
    // Each value is an array iether empty or ids to tiles and corresponding rule 
    tiles.forEach((tile) => {
        const rule = {"up" : [], "right" : [],  "down" : [], "left" : [],}
        const sides = getSides(tile, settings.x, settings.y)

        tiles.forEach((newTile, index) => {
            const newSides = getSides(newTile, settings.x, settings.y)
            if (compareSides(sides.left, newSides.right)) rule.left.push(index)
            if (compareSides(sides.right, newSides.left)) rule.right.push(index)
            if (compareSides(sides.up, newSides.down)) rule.up.push(index)
            if (compareSides(sides.down, newSides.up)) rule.down.push(index)
        })

        rules.push(rule)
    })

    console.log(rules)

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