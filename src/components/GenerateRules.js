function generateRules(canvasData, settings) {

    const valuesPerPixel = 4
    const rules = []

    for (let row = 0; row < canvasData.width - settings.y; row++){
        for (let column = 0; column < canvasData.width - settings.x; column++) {
            
            let newArray = new Uint8ClampedArray(settings.y * settings.x * valuesPerPixel)

            for (let matrixRow = 0; matrixRow < settings.y; matrixRow++) {
                const startPixel = (column + (matrixRow + row) * canvasData.width) * valuesPerPixel
                const pixelRow = canvasData.data.slice(startPixel, startPixel + settings.x * valuesPerPixel)
                newArray.set(pixelRow, matrixRow * valuesPerPixel)
            }

            rules.push(newArray)
        }
    }

    return rules
}

export default generateRules