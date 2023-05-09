import './App.css';
import Canvas from './components/Canvas'
import {React, useState} from 'react';

function App() {
  const [page, setPage] = useState("canvas")
  const [canvasData, setCanvasData] = useState([])
  console.log(canvasData)
  return (
    <div className="App">
      <Side page={page} setPage={setPage}/> 
      <Canvas style={page === "canvas" ? "" : "none"} setCanvasData={setCanvasData}/> 
      <div style={{display : page === "rules" ? "" : "none"}} /> 
      <div style={{display : page === "play" ? "" : "none"}} /> 
    </div>
  );
}

function Side(props) {
  return (
    <div className="Side"> 
      <button onClick={() => props.setPage("canvas")} className={props.page === "canvas" ? "active" : ""}>Canvas</button>
      <button onClick={() => props.setPage("rules")} className={props.page === "rules" ? "active" : ""}>Rules</button>
      <button onClick={() => props.setPage("play")} className={props.page === "play" ? "active" : ""}>Play</button>
    </div>
  )
}

export default App;