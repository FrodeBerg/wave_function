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
  let height = 400
  let width = 400 * ratio;
  
  if (ratio > 2) { 
    width = 800
    height = 800 / ratio
  }
  console.log(height)
  return (
    <div className="Main"> 
      <canvas id="canvas" 
      onMouseDown={(e) => {move(e, props.brushSize, props.color)}} 
      onMouseMove={(e) => {if (isPressed) move(e, props.brushSize, props.color)}} 
      width={props.size.x} 
      height={props.size.y}
      style={{"width": width,"height" : height}}>
      </canvas>
    </div>
  )
}

function move(e, size, color) {
  const canvas = document.getElementById("canvas")    
  if ( e.target.id !== "canvas") return

  let rect = e.target.getBoundingClientRect();

  let posX = Math.floor((e.clientX - rect.left) / canvas.offsetWidth * canvas.width);
  let posY = Math.floor((e.clientY - rect.top) / canvas.offsetHeight * canvas.height);
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(posX - Math.floor(size / 2), posY - Math.floor(size / 2), size, size)   
  // console.log(ctx.getImageData(0,0, canvas.width, canvas.height))   
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
      <input placeholder={10} onChange={(e) => {props.setSize({...props.size, "x" : +e.target.value})}}/>
      <input placeholder={10} onChange={(e) => {props.setSize({...props.size, "y" : +e.target.value})}}/>
      <input placeholder={1} onChange={(e) => {props.setBrushSize(+e.target.value)}}/>
      <input type={"color"} placeholder={"#000000"} onChange={(e) => {props.setColor(e.target.value)}}/>
    </div>
  )
}

export default App;
