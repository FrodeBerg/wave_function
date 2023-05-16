import { React, useState, useEffect } from "react"
import { scaleCanvas, averageColor, getRelativeMousePosition, colorCanvas, paintCanvas, getKey } from "./helperFunctions"

function Collapse(props) {
    
    const [settings, setSettings] = useState({"x" : 100, "y" : 100})

    function click(e) {

        if (e.target.id !== "output") return
        let [positionX, positionY] = getRelativeMousePosition(e)
        const possibilities = {}
        const queue = []
        console.log(positionX, positionY)
        positionX = tilePosition(props.rules.width, positionX)
        positionY = tilePosition(props.rules.height, positionY)  
        queue.push([positionX, positionY])
        console.log(positionX, positionY)
        const canvas = e.target
        const maxLength = props.rules.tiles.length
        console.log(props.rules)

        while (queue.length) {
            const [x, y] = queue.shift()
            const position = `${x},${y}`
            let tiles = getKey(possibilities, position, null)
            if (!tiles || tiles.length === maxLength) {
                tiles = [chooseRandom(props.rules.frequency)]
            }
            if (tiles.length === 1) {
                console.log(props.rules.tiles[tiles[0]])
                paintCanvas(canvas, props.rules.tiles[tiles[0]], canvasPosition(props.rules.width, positionX), canvasPosition(props.rules.height, positionY), props.rules.width, props.rules.height)
            }
            console.log(tiles)
            // Update each side if necessary 
            // if side is updated add that side to queue 
        }
    
    }


    useEffect(() => {
        let canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        const color = averageColor([ctx.getImageData(0, 0, canvas.width, canvas.height).data])

        const outputCanvas = document.getElementById("output")
        colorCanvas(outputCanvas, color)
        
    }, [props.page, settings])

    return (
        <div className="Main" style={{display: props.style}}>
            <div className='canvasContainer'> 
                <canvas 
                id="output"
                width={settings.x} 
                height={settings.y} 
                style={scaleCanvas(settings.x, settings.y)}
                onClick={e => click(e)}>
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

function canvasPosition(size, position) {
    return position * (size - 1)
}

function tilePosition(size, position) {
    return Math.ceil((position - 1) / (size - 1))
}

function chooseRandom(frequency) {
    let total = 0
    frequency.forEach(number => {
        total += number
    });

    const randomNumber = Math.random() * total
    let running = 0
    for (let i = 0; i < frequency.length; i++) {
        running += frequency[i]
        if (randomNumber < running) return i
    }
}

export default Collapse