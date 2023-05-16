import { React, useState, useEffect } from "react"
import { scaleCanvas, averageColor, getRelativeMousePosition, colorCanvas, paintCanvas, getKey } from "./helperFunctions"

function Collapse(props) {
    
    const [settings, setSettings] = useState({"x" : 100, "y" : 100})

    function click(e) {

        if (e.target.id !== "output") return
        let [positionX, positionY] = getRelativeMousePosition(e)
        const possibilities = {}
        const queue = []
        const uncertainQueue = []
        positionX = tilePosition(props.rules.width, positionX)
        positionY = tilePosition(props.rules.height, positionY)  
        queue.push([positionX, positionY])
        const canvas = e.target
        const maxLength = props.rules.tiles.length
        const maxWidth = tilePosition(props.rules.width, settings.x)
        const maxHeight = tilePosition(props.rules.height, settings.y)


        
        function loopQueue() {
            const [x, y] = queue.shift()
            let changed = false
            let tiles = []

            const right = getKey(possibilities, [x+1, y], null)
            const left = getKey(possibilities, [x-1, y], null)
            const up = getKey(possibilities, [x, y+1], null)
            const down = getKey(possibilities, [x, y-1], null)

            if (!right && !left && !up && !down) {
                tiles.push(chooseRandom(props.rules.frequency))
            }


            if (queue.length) {
                setTimeout(() => {
                    loopQueue()
                }, 10);
            }
        }

        loopQueue()
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

function chooseRandom(frequency, tiles = null) {
    if (!tiles) {
        tiles = []
        for (let i = 0; i < frequency.length; i++) {
            tiles.push(i)
        }
    } else {
        console.log(tiles)
    }
    
    let total = 0
    tiles.forEach(tile => {
        total += frequency[tile]
    });

    const randomNumber = Math.random() * total
    let running = 0
    for (let i = 0; i < tiles.length; i++) {
        running += frequency[tiles[i]]
        if (randomNumber < running) return i
    }
}

export default Collapse