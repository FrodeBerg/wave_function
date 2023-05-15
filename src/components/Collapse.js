import { React, useState, useEffect } from "react"
import { scaleCanvas, averageColor } from "./helperFunctions"

function Collapse(props) {
    
    const [settings, setSettings] = useState({"x" : 100, "y" : 100})

    function collapse(e) {
        console.log(e)

    }

    useEffect(() => {

        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext("2d")
        let collpasedCanvas = document.getElementById("collapsedCanvas")
        let collapsedCtx = collpasedCanvas.getContext("2d")
    

        let color = averageColor([ctx.getImageData(0, 0, canvas.width, canvas.height).data])
        console.log(color)
        collapsedCtx.fillStyle = color
        collapsedCtx.fillRect(0, 0, collpasedCanvas.width, collpasedCanvas.height)
        


    }, [props.page])

    return (
        <div className="Main" style={{display: props.style}}>
            <div className='canvasContainer'> 
                <canvas 
                id="collapsedCanvas"
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

function chooseRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

export default Collapse