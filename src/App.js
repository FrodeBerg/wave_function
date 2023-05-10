import './App.css';
import Canvas from './components/Canvas'
import Rules from './components/Rules'
import Collapse from './components/Collapse';
import generateRules from './components/GenerateRules';
import {React, useState, useEffect} from 'react';

function App() {
  const [page, setPage] = useState("canvas")
  const [canvasData, setCanvasData] = useState({})
  const [rules, setRules] = useState({"tiles" : [], "settings" : null})
  const [ruleSettings, setruleSettings] = useState({
    "x": 3,
    "y": 3,
    "rotation": false, 
  })



  useEffect(() => {
    setRules(generateRules(canvasData, ruleSettings))
  }, [ruleSettings, canvasData])

  return (
    <div className="App">
      <Side page={page} setPage={setPage} setCanvasData={setCanvasData}/> 
      <Canvas style={page === "canvas" ? "" : "none"} /> 
      <Rules style={page === "rules" ? "" : "none"} 
      settings={ruleSettings} setSettings={setruleSettings} 
      rules={rules}/> 
      <Collapse style={page === "collapse" ? "" : "none"} rules={rules}/> 
    </div>
  );
}

function getCanvasData(setCanvasData) {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  setCanvasData({
      "data": ctx.getImageData(0,0, canvas.width, canvas.height).data, 
      "height": canvas.height,
      "width": canvas.width,
  })  
}

function Side(props) {
  return (
    <div className="Side"> 
      <button onClick={() => props.setPage("canvas")} className={props.page === "canvas" ? "active" : ""}>Canvas</button>
      <button onClick={() => {props.setPage("rules"); getCanvasData(props.setCanvasData)}} className={props.page === "rules" ? "active" : ""}>Rules</button>
      <button onClick={() => props.setPage("collapse")} className={props.page === "collapse" ? "active" : ""}>Collapse</button>
    </div>
  )
}

export default App;