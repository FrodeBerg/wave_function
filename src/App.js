import './App.css';
import Canvas from './components/Canvas'
import Rules from './components/Rules'
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
      <Side page={page} setPage={setPage}/> 
      <Canvas style={page === "canvas" ? "" : "none"} setCanvasData={setCanvasData}/> 
      <Rules style={page === "rules" ? "" : "none"} 
      settings={ruleSettings} setSettings={setruleSettings} 
      rules={rules}/> 
      <div style={{display : page === "collapse" ? "" : "none"}} /> 
    </div>
  );
}

function Side(props) {
  return (
    <div className="Side"> 
      <button onClick={() => props.setPage("canvas")} className={props.page === "canvas" ? "active" : ""}>Canvas</button>
      <button onClick={() => props.setPage("rules")} className={props.page === "rules" ? "active" : ""}>Rules</button>
      <button onClick={() => props.setPage("collapse")} className={props.page === "collapse" ? "active" : ""}>Collapse</button>
    </div>
  )
}

export default App;