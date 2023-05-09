import {useState} from 'react';

function Rules(props) {
    return (
        <div className="Main" style={{display: props.style}}>
            <div> 

            </div>
            <div className="Bottom"> 
                <input placeholder={3} onChange={(e) => {props.setSettings({...props.settings, "x" : +e.target.value})}}/>
                <input placeholder={3} onChange={(e) => {props.setSettings({...props.settings, "y" : +e.target.value})}}/>
                <input placeholder={1} type={"checkbox"} onChange={(e) => {props.setSettings({...props.settings, "rotation": e.target.checked})}}/>
            </div>       
        </div>
    )  
}

export default Rules