import generateRules from './GenerateRules';

import {useState, useEffect} from 'react';


function Rules(props) {
    const [settings, setSettings] = useState({
        "x": 3,
        "y": 3,
        "rotation": false, 
    })



    useEffect(() => {
        
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        const tiles = []
        const rules = {
            "sides" : {"up" : {}, "left" : {}, "right" : {}, "down" : {}},
            "tiles" : []
        }
        const frequency = []

        // Timeout after each row to let ui update
        function rowLoop(row) {

            for (let column = 0; column <= canvas.width - settings.y; column++) {

                const tile = ctx.getImageData(column, row, settings.x, settings.y)

                generateRules(tile, tiles, rules, frequency)

            }
            row++
            
            if (row > canvas.height - settings.x) {
                console.log("finis")
                console.log(rules)
                // end point 
                props.setRules({"tiles" : tiles, "rules" : rules, "frequency" : frequency})
                return
            }
            setTimeout(() => {rowLoop(row)}, 1);                
        }

        rowLoop(0)

    }, [settings, props.page, props.hasChanged])

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