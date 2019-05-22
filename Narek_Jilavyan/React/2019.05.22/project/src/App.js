import React from 'react';
import logo from './logo.svg';
import './App.css';

function Par(props) {
  const pStyle = { color: props.tColor };
  return <p style={ pStyle }>{props.text}</p>;
}




function App() {
  return (
    <div className="App">
      <Par text="Алиса" tColor='red' />
      <Par text="Andrey" tColor='blue' />	  
    </div>
  );
}

export default App;
