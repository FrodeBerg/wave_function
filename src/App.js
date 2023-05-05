import './App.css';
import {React, useState} from 'react';


function App() {
  return (
    <div className="App">
      <Main /> 
      <Side /> 
      <Bottom />
    </div>
  );
}

function Main() {
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

function Bottom() {
  return (
    <div className="Bottom"> 
      <h2>x : 21</h2>
      <h2>y : 12</h2>
      <h2>scale : 1</h2>
    </div>
  )
}

export default App;
