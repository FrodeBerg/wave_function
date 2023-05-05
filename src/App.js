import './App.css';

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
  return (
    <div className="Main"> 
      <canvas></canvas>
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
