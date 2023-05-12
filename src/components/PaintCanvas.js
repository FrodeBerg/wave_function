function paintCanvas(canvas, data) {

    const x = canvas.width
    const y = canvas.height

    const imageData = new ImageData(data, x, y)
    const ctx = canvas.getContext("2d")

    ctx.putImageData(imageData, 0, 0)
}

export default paintCanvas