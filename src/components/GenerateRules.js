function generateRules(canvasData, settings) {
    
    const tiles = generateTiles(canvasData, settings)

    return {"tiles" : tiles, "settings": settings}
}

function generateTiles(canvasData, settings) {

    const valuesPerPixel = 4
    const tiles = []
    for (let row = 0; row <= canvasData.height - settings.x; row++){
        for (let column = 0; column <= canvasData.width - settings.y; column++) {

            let newArray = new Uint8ClampedArray(settings.y * settings.x * valuesPerPixel)
            for (let matrixRow = 0; matrixRow < settings.y; matrixRow++) {
                const startPixel = (column + (matrixRow + row) * canvasData.width) 
                const pixelRow = canvasData.data.slice(startPixel * valuesPerPixel, (startPixel + settings.x) * valuesPerPixel)
                newArray.set(pixelRow, matrixRow * valuesPerPixel * settings.x)
            }
            
            tiles.push(newArray)
        }
    }

    return tiles
}

export default generateRules