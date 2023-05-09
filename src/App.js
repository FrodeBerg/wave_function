import './App.css';
import Canvas from './components/Canvas'
import {React, useState, useEffect} from 'react';

function App() {
  const [page, setPage] = useState("canvas")
  const [mainPage, setMainPage] = useState(<Canvas />)
  
  useEffect(() => {
    if (page === "canvas")  setMainPage(<Canvas />)
    if (page === "rules") setMainPage(<div />)
    if (page === "play") setMainPage(<div />)
  }, [page]);

  return (
    <div className="App">
      <Side page={page} setPage={setPage}/> 
      {mainPage}
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