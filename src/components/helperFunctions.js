export function paintCanvas(canvas, data) {

    const x = canvas.width
    const y = canvas.height

    const imageData = new ImageData(data, x, y)
    const ctx = canvas.getContext("2d")

    ctx.putImageData(imageData, 0, 0)
}

export function averageColor(canvasArray) {
    let red = 0
    let green = 0
    let blue = 0
    let aplha = 0
    let length = 0

    canvasArray.forEach(canvas => {
        const pixelLength = canvas.length
        length += pixelLength

        for (let i = 0; i < length; i++) {
            let color = i % 4
            if (color === 0) red += canvas[i]
            if (color === 1) green += canvas[i]
            if (color === 2) blue += canvas[i]
            if (color === 3) aplha += canvas[i]
        }
        
    })

    red /= length 
    green /= length
    blue /= length
    aplha /= length

    return [red, green, blue, aplha]
}

export function scaleCanvas(x, y) {
    let ratio = x / y
    let height = 400
    let width = 400 * ratio;

    if (ratio > 2) { 
        width = 800
        height = 800 / ratio
    }

    return {"width": width,"height" : height}
}