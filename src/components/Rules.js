import generateRules from './GenerateRules';

import {useState, useEffect, useRef} from 'react';


function Rules(props) {
    const isRunning = useRef(false)
    const stopRunning = useRef(false)
    const [settings, setSettings] = useState({
        "x": 3,
        "y": 3,
        "rotation": false, 
    })

    const hasChanged = props.hasChanged
    const page = props.page
    const setHasChanged = props.setHasChanged
    const setRules = props.setRules

    useEffect(() => {
        if (page !== "canvas" && hasChanged) setHasChanged(false)
    }, [hasChanged, page, setHasChanged])

    useEffect(() => {
        stopRunning.current = true

        if (hasChanged) return
        // Timeout after each row to let ui update
        function rowLoop(rules, ctx, tiles = [], frequency = [], row = 0) {

            for (let column = 0; column <= canvas.width - settings.y; column++) {
                if (stopRunning.current) {
                    isRunning.current = false
                    return
                }
                const tile = ctx.getImageData(column, row, settings.x, settings.y)

                generateRules(tile, tiles, rules, frequency)
            }

            row++   
            if (row > canvas.height - settings.x) {

                isRunning.current = false
                // end point 
                setRules({"tiles" : tiles, "rules" : rules, "frequency" : frequency, "width" : settings.x, "height" : settings.y})

                return
            }
            setTimeout(() => {rowLoop(rules, ctx, tiles, frequency, row)}, 0);                
        }

        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")

        function wait() {

            if (!isRunning.current) {
                stopRunning.current = false

                document.getElementById("ruleContainer").innerHTML = ""

                rowLoop({"sides" : {"up" : {}, "left" : {}, "right" : {}, "down" : {}}, "tiles" : []}, ctx)
                isRunning.current = true      
                         
            } else {
                setTimeout(() => {
                    wait()
                }, 100);                 
            }
        }
        wait()

    }, [settings, hasChanged, setRules])

    return (
        <div className="Main" style={{display: props.style}}>
            <div className='Rules' id="ruleContainer"> 

            </div>
            <div className="Bottom"> 
                <input placeholder={3} onChange={(e) => {setSettings({...settings, "x" : +e.target.value}); }}/>
                <input placeholder={3} onChange={(e) => {setSettings({...settings, "y" : +e.target.value})}}/>
                <input placeholder={1} type={"checkbox"} onChange={(e) => {setSettings({settings, "rotation": e.target.checked})}}/>
            </div>       
        </div>
    )  
}

export default Rules