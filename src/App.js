import './App.css';
import {React, useState} from 'react';


function App() {
  const [size, setSize] = useState({"x" : 0, "y" : 0})
  
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
  const [posY, setPosY] = useState(0)
  const [posX, setPosX] = useState(0)

  document.onmousemove = (e) => {
    if (e.target.id !== "canvas") return
    let rect = e.target.getBoundingClientRect();

    setPosX(e.clientX - Math.floor(rect.left));
    setPosY(e.clientY - Math.floor(rect.top));
  }

  return (
    <div className="Main"> 
      <canvas id="canvas"></canvas> 
      <h3>Y: {posY}, X: {posX}</h3>
      <h3>SizeX: {props.size.x}, SizeY: {props.size.y}</h3>
    </div>
  )
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
