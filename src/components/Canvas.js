import {useState} from 'react';

function Canvas() {
    let isPressed = false;

    document.onmousedown = () => isPressed = true
    document.onmouseup = () => isPressed = false

    const [size, setSize] = useState({"x" : 10, "y" : 10})
    const [brushSize, setBrushSize] = useState(1)
    const [color, setColor] = useState("#000000")

    let ratio = size.x / size.y
    let height = 400
    let width = 400 * ratio;

    if (ratio > 2) { 
        width = 800
        height = 800 / ratio
    }

    function paint(e) {
        const canvas = document.getElementById("canvas")    
        if (e.target.id !== "canvas") return

        let rect = e.target.getBoundingClientRect();

        let posX = Math.floor((e.clientX - rect.left) / canvas.offsetWidth * canvas.width);
        let posY = Math.floor((e.clientY - rect.top) / canvas.offsetHeight * canvas.height);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(posX - Math.floor(brushSize / 2), posY - Math.floor(brushSize/ 2), brushSize, brushSize)   
        // console.log(ctx.getImageData(0,0, canvas.width, canvas.height))   
    }

    return (
        <div className="Main">
            <div className='canvasContainer'> 
                <canvas id="canvas" 
                onMouseDown={(e) => {paint(e)}} 
                onMouseMove={(e) => {if (isPressed) paint(e)}} 
                width={size.x} 
                height={size.y}
                style={{"width": width,"height" : height}}>
                </canvas>
            </div>
            <div className="Bottom"> 
                <input placeholder={10} onChange={(e) => {setSize({...size, "x" : +e.target.value})}}/>
                <input placeholder={10} onChange={(e) => {setSize({...size, "y" : +e.target.value})}}/>
                <input placeholder={1} onChange={(e) => {setBrushSize(+e.target.value)}}/>
                <input type={"color"} placeholder={"#000000"} onChange={(e) => {setColor(e.target.value)}}/>
            </div>       
        </div>
    )  
}

export default Canvas