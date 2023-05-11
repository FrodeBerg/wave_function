function paintCanvas(canvas, data) {

    const rows = data[0].length;
    const rowLength = data[0][0].length
    const newData = new Uint8ClampedArray(rows * rowLength)

    const x = canvas.width
    const y = canvas.height

    for (let row = 0; row < rows; row++){
        newData.set(data[0][row], row * rowLength)
    }

    const imageData = new ImageData(newData, x, y)
    const ctx = canvas.getContext("2d")

    ctx.putImageData(imageData, 0, 0)
}

export default paintCanvas