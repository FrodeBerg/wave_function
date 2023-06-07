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
            //console.log("______", x, y, "_______")
            //console.log(Object.assign({}, possibilities))
            const position = `${x},${y}`
            let tiles = getKey(possibilities, position, null)
            if (!tiles || tiles.length === maxLength) {
                tiles = [chooseRandom(props.rules.frequency)]
                possibilities[position] = tiles
            }


            if (x - 1 >= 0) {
                const left = [...getSides(tiles, "left", "right")]
                const diffLeft = difference(possibilities[`${x-1},${y}`], left)
                if (diffLeft) {
                    //console.log("Left", diffLeft)
                    possibilities[`${x-1},${y}`] = diffLeft
                    queue.push([x - 1, y])
                }
            }
            if (x + 1 < maxWidth) {
                const right = [...getSides(tiles, "right", "left")]
                const diffRight = difference(possibilities[`${x+1},${y}`], right)
                if (diffRight) {
                    possibilities[`${x+1},${y}`] = diffRight
                    queue.push([x + 1, y])
                }                
            }
            if (y - 1 >= 0) {
                const up = [...getSides(tiles, "up", "down")]
                const diffup = difference(possibilities[`${x},${y-1}`], up)
                if (diffup) {
                    possibilities[`${x},${y-1}`] = diffup
                    queue.push([x, y - 1])
                }
            }
            if (y + 1 < maxHeight) {
                const down = [...getSides(tiles, "down", "up")]
                const diffdown = difference(possibilities[`${x},${y+1}`], down)
                if (diffdown) {
                    possibilities[`${x},${y+1}`] = diffdown
                    queue.push([x, y + 1])
                }                
            }

            if (tiles.length === 1) {
                console.log("painting", x, y, tiles)
                paintCanvas(canvas, props.rules.tiles[tiles[0]], canvasPosition(props.rules.width, x), canvasPosition(props.rules.height, y), props.rules.width, props.rules.height)
            } else {
                const tmpTiles = []
                tiles.forEach(tile => {
                    tmpTiles.push(props.rules.tiles[tile])
                })
                const color = averageColor(tmpTiles)
                colorCanvas(canvas, color, canvasPosition(props.rules.width, x), canvasPosition(props.rules.height, y), props.rules.width, props.rules.height)
                uncertainQueue.push([x, y])
                //queue.push([x, y])
            }

            if (!queue.length) {
                //console.log(x, y, "______ Uncertain!!!!!! _______")
                while (uncertainQueue.length) {
                    const [newX, newY] = uncertainQueue.shift()
                    if ( possibilities[`${newX},${newY}`].length !== 1) {
                        //console.log(Object.assign({}, possibilities))
                        //console.log(newX, newY)
                        const random = [chooseRandom(props.rules.frequency, possibilities[`${newX},${newY}`])]
                        possibilities[`${newX},${newY}`] = random
                        queue.push([newX, newY])    
                        break
                    }
                }
                
            }

            if (queue.length) {
                setTimeout(() => {
                    loopQueue()
                }, 0);
            } else {
                console.log(possibilities)
            }
            // Update each side if necessary 
            // if side is updated add that side to queue 
        }

        loopQueue()
        

        function getSides(tiles, side, oppositeSide) {
            let sides = []
            tiles.forEach(tile => {
                const tileSide = (props.rules.rules.tiles[tile][side])
                sides = sides.concat(props.rules.rules.sides[oppositeSide][tileSide])
            })
            return new Set(sides)
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

function difference(oldElements, newElments) {
    if (!newElments.length) return false
    if (!oldElements) return newElments
    const intersection = []
    let isUnque = false
    oldElements.forEach(element => {
        if (newElments.includes(element)) {
           intersection.push(element)
        } else {
            isUnque = true
        }
    })
    if (isUnque && intersection.length) return intersection
    return false
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