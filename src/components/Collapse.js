import { React, useState, useEffect } from "react"
import { scaleCanvas, averageColor, getRelativeMousePosition, colorCanvas, paintCanvas } from "./helperFunctions"

function Collapse(props) {
    
    const [settings, setSettings] = useState({"x" : 100, "y" : 100})

    function collapse(e) {
        console.log(e)

        if (e.target.id !== "output") return
        const [positionX, positionY] = getRelativeMousePosition(e)
        const canvas = e.target
        const tile = props.rules.tiles[0]

        paintCanvas(canvas, tile, positionX, positionY, props.rules.width, props.rules.height)
    }

    useEffect(() => {
        let canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        const color = averageColor([ctx.getImageData(0, 0, canvas.width, canvas.height).data])

        const outputCanvas = document.getElementById("output")
        colorCanvas(outputCanvas, color)
        
    }, [props.page])

    return (
        <div className="Main" style={{display: props.style}}>
            <div className='canvasContainer'> 
                <canvas 
                id="output"
                width={settings.x} 
                height={settings.y} 
                style={scaleCanvas(settings.x, settings.y)}
                onClick={e => collapse(e)}>
                </canvas>
            </div>
            <div className="Bottom"> 
                <input placeholder={100} onChange={(e) => {setSettings({...settings, "x" : +e.target.value})}}/>
                <input placeholder={100} onChange={(e) => {setSettings({...settings, "y" : +e.target.value})}}/>
                <h2>Click on tile to collapse!</h2>
            </div>       
        </div>
    )  
}

function chooseRandom(array, frequency) {
    return array[Math.floor(Math.random() * array.length)]
}

export default Collapse