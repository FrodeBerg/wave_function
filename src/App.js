import './App.css';
import Canvas from './components/Canvas'
import {React} from 'react';

function App() {

  let Main = <Canvas />
  return (
    <div className="App">
      <Side /> 
      {Main}
    </div>
  );
}

function Side() {
  return (
    <div className="Side"> 
      <h2>Canvas</h2>
      <h2>Rules</h2>
      <h2>Play</h2>
    </div>
  )
}


export default App;
