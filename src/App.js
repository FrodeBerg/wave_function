import './App.css';
import {React, useState} from 'react';


function App() {
  const [size, setSize] = useState({"x" : 10, "y" : 10})
  
  function setSizeFunction(indicator, value) {
    setSize({
      ...size,
      [indicator] : +value
    })
  }



  return (
    <div className="App">
      <Main size = {size}/> 
      <Side /> 
      <Bottom size={size} setSize={setSizeFunction}/>
    </div>
  );
}

function Main(props) {
  let isPressed = false;
  return (
    <div className="Main"> 
      <canvas id="canvas" onMouseDown={(e) => {isPressed = true; move(e)}} onMouseUp={() => isPressed = false} onMouseMove={(e) => {if (isPressed) move(e)}} width={props.size.x} height={props.size.y}></canvas> 
    </div>
  )
}

function move(e) {
  const canvas = document.getElementById("canvas")    
  if (!canvas || e.target.id !== "canvas") return

  let rect = e.target.getBoundingClientRect();

  let posX = Math.floor((e.clientX - rect.left) / 100 * canvas.width);
  let posY = Math.floor((e.clientY - rect.top) / 100 * canvas.height);

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb("+0+", "+0+", "+0+")";
  ctx.fillRect(posX, posY, 1, 1)      
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
      <input label={props.size[0]} onChange={(e) => {props.setSize("x", (e.target.value))}}/>
      <input label={props.size[1]} onChange={(e) => {props.setSize("y", (e.target.value))}}/>
      <h2>scale : 1</h2>
    </div>
  )
}

export default App;
