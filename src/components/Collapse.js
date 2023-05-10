import { React, useState } from "react"

function Collapse(props) {
    
    const [settings, setSettings] = useState({"x" : 100, "y" : 100})

    let ratio = settings.x / settings.y
    let height = 400
    let width = 400 * ratio;

    if (ratio > 2) { 
        width = 800
        height = 800 / ratio
    }

    function collapse(e) {
        console.log(e)

    }

    return (
        <div className="Main" style={{display: props.style}}>
            <div className='canvasContainer'> 
                <canvas 
                width={settings.x} 
                height={settings.y} 
                style={{"width": width,"height" : height}}
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