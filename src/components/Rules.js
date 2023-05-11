import generateRules from './GenerateRules';

import {useState, useEffect, useRef} from 'react';


function Rules(props) {
    const [ruleSettings, setRuleSettings] = useState({
        "x": 3,
        "y": 3,
        "rotation": false, 
    })
    let previousSettings = useRef(ruleSettings)

    useEffect(() => {
        
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")
        const canvasData = {
            "data": ctx.getImageData(0,0, canvas.width, canvas.height).data, 
            "height": canvas.height,
            "width": canvas.width,
        }  

        if (props.page !== "canvas" && props.hasChanged) {
            generateRules(canvasData, ruleSettings, props.setRules)  
            props.setHasChanged(false)
        }
        if (!compareObjects(previousSettings.current, ruleSettings)) {
            generateRules(canvasData, ruleSettings, props.setRules)  
            previousSettings.current = ruleSettings
        }

    }, [ruleSettings, props.page, props.hasChanged])

    return (
        <div className="Main" style={{display: props.style}}>
            <div className='Rules' id="ruleContainer"> 

            </div>
            <div className="Bottom"> 
                <input placeholder={3} onChange={(e) => {setRuleSettings({...ruleSettings, "x" : +e.target.value}); }}/>
                <input placeholder={3} onChange={(e) => {setRuleSettings({...ruleSettings, "y" : +e.target.value})}}/>
                <input placeholder={1} type={"checkbox"} onChange={(e) => {setRuleSettings({ruleSettings, "rotation": e.target.checked})}}/>
            </div>       
        </div>
    )  
}

function compareObjects(object1, object2) {
    
    const keys = Object.keys(object1)
    for (let i = 0; i < keys.length; i++) {
        if (object1[keys[i]] !== object2[keys[i]]) return false
    }

    return true
}

export default Rules