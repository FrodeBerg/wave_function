import './App.css';
import {React, useState} from 'react';

let isPressed = false;

document.onmousedown = () => isPressed = true
document.onmouseup = () => isPressed = false

function App() {
  const [size, setSize] = useState({"x" : 10, "y" : 10})
  const [brushSize, setBrushSize] = useState(1)
  const [color, setColor] = useState("#000000")
  return (
    <div className="App">
      <Main size = {size} brushSize={brushSize} color={color}/> 
      <Side /> 
      <Bottom size={size} setSize={setSize} 
      brushSize={brushSize} setBrushSize={setBrushSize}
      color={color} setColor={setColor}
      />
    </div>
  );
}

function Main(props) {

  let ratio = props.size.x / props.size.y
  console.log(ratio)

  return (
    <div className="Main"> 
      <div className='canvasContainer'>
        <canvas id="canvas" 
        onMouseDown={(e) => {move(e, props.brushSize, props.color)}} 
        onMouseMove={(e) => {if (isPressed) move(e, props.brushSize, props.color)}} 
        width={props.size.x} 
        height={props.size.y}
        style={{"width": `${400 * ratio}px`}}>
        </canvas>
      </div>
    </div>
  )
}

function move(e, size, color) {
  const canvas = document.getElementById("canvas")    
  if ( e.target.id !== "canvas") return

  let rect = e.target.getBoundingClientRect();

  let posX = Math.floor((e.clientX - rect.left) / canvas.offsetWidth * canvas.width);
  let posY = Math.floor((e.clientY - rect.top) / canvas.offsetHeight * canvas.height);
  console.log(color)
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(posX, posY, size, size)      
}

function Side() {
  return (
    <div className="Side"> 
      <h2>Canvas</h2>
      <h2>Settings</h2>
      <h2>Play</h2>
    </div>
  )
}

function Bottom(props) {

  return (
    <div className="Bottom"> 
      <input placeholder={props.size.x} onChange={(e) => {props.setSize({...props.size, "x" : +e.target.value})}}/>
      <input placeholder={props.size.y} onChange={(e) => {props.setSize({...props.size, "y" : +e.target.value})}}/>
      <input placeholder={props.brushSize} onChange={(e) => {props.setBrushSize(+e.target.value)}}/>
      <input type={"color"} placeholder={props.color} onChange={(e) => {props.setColor(e.target.value)}}/>
    </div>
  )
}

export default App;
