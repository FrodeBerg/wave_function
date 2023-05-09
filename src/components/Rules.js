import paintCanvas from "./PaintCanvas"
import {useEffect} from 'react';


function Rules(props) {

    useEffect(() => {
        props.rules.rules.forEach((data, index) => {
            let canvas = document.getElementById(`canvas${index}`)
            paintCanvas(canvas, data, props.rules.settings.x, props.rules.settings.y)
        })
    }, [props.rules])

    return (
        <div className="Main" style={{display: props.style}}>
            <div className='Rules'> 
                <ul>
                    {props.rules.rules.map((data, index) => {
                        return <li key={index}><canvas width={props.settings.x} height={props.settings.y} id={`canvas${index}`}></canvas></li>
                    })}
                </ul>
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