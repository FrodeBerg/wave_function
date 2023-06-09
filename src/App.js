import './App.css';
import Canvas from './components/Canvas'
import Rules from './components/Rules'
import Collapse from './components/Collapse';
import {React, useState, useEffect} from 'react';

function App() {
  const [page, setPage] = useState("canvas")
  const [rules, setRules] = useState({})
  const [hasChanged, setHasChanged] = useState(true)


  return (
    <div className="App">
      <Side page={page} setPage={setPage}/> 
      <Canvas style={page === "canvas" ? "" : "none"} setHasChanged={setHasChanged}/> 
      <Rules style={page === "rules" ? "" : "none"} 
      setRules={setRules} 
      page={page}
      hasChanged={hasChanged}
      setHasChanged={setHasChanged}

      /> 
      <Collapse style={page === "collapse" ? "" : "none"} rules={rules} page={page}/> 
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