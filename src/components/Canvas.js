import {useState} from 'react';
import { scaleCanvas, getRelativeMousePosition } from './helperFunctions';

function Canvas(props) {
    let isPressed = false;

    document.onmousedown = () => isPressed = true
    document.onmouseup = () => isPressed = false

    const [size, setSize] = useState({"x" : 10, "y" : 10})
    const [brushSize, setBrushSize] = useState(1)
    const [color, setColor] = useState("#000000")

    function paint(e) {
        if (e.target.id !== "canvas") return
        const canvas = e.target

        let [posX, posY] = getRelativeMousePosition(e)
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(posX - Math.floor(brushSize / 2), posY - Math.floor(brushSize/ 2), brushSize, brushSize)   
        props.setHasChanged(true)
    }

    return (
        <div className="Main" style={{display: props.style}}>
            <div className='canvasContainer'> 
                <canvas id="canvas" 
                onMouseDown={(e) => {paint(e)}} 
                onMouseMove={(e) => {if (isPressed) paint(e)}} 
                width={size.x} 
                height={size.y}
                style={scaleCanvas(size.x, size.y)}>
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