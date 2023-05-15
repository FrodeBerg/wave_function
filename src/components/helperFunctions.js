export function paintCanvas(canvas, data, positionX = 0, positionY = 0, width = canvas.width, height = canvas.height) {

    const imageData = new ImageData(data, width, height)
    const ctx = canvas.getContext("2d")

    ctx.putImageData(imageData, positionX, positionY)
}

export function colorCanvas(canvas, color, positionX = 0, positionY = 0, width = canvas.width, height = canvas.height) {
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = color;

    ctx.fillRect(positionX, positionY, width, height)  
    console.log(canvas, color, width, height)
}

export function averageColor(canvasArray) {
    let red = 0
    let green = 0
    let blue = 0
    let alpha = 0
    let length = 0

    canvasArray.forEach(canvas => {
        console.log(canvas)
        const pixelLength = canvas.length
        length += pixelLength

        for (let i = 0; i < length; i++) {
            let color = i % 4
            if (color === 0) red += canvas[i]
            if (color === 1) green += canvas[i]
            if (color === 2) blue += canvas[i]
            if (color === 3) alpha += canvas[i]
        }
        
    })

    red = Math.floor(red / (length / 4))
    green = Math.floor(green / (length / 4))
    blue = Math.floor(blue / (length / 4))
    alpha = Math.floor(alpha / (length / 4))

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
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

export function getRelativeMousePosition(e) {
    const canvas = e.target
    const rect = canvas.getBoundingClientRect();

    const positionX = Math.floor((e.clientX - rect.left) / canvas.offsetWidth * canvas.width);
    const positionY = Math.floor((e.clientY - rect.top) / canvas.offsetHeight * canvas.height);

    return [positionX, positionY]

}