function generateRules(canvasData, settings) {

    const valuesPerPixel = 4
    const rules = []

    for (let row = 0; row < canvasData.width - settings.y; row++){
        for (let column = 0; column < canvasData.width - settings.x; column++) {
            
            let newRule = []

            for (let matrixRow = row; matrixRow < row + settings.y; matrixRow++) {
                const startPixel = (column + matrixRow * canvasData.width) * valuesPerPixel
                const pixelRow = canvasData.data.slice(startPixel, startPixel + settings.x * valuesPerPixel)
                newRule = newRule.concat(pixelRow)
            }

            rules.push(newRule)
        }
    }

    return rules
}

export default generateRules