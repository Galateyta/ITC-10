import React from 'react';
import './App.css';
import Text from './Text.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Text text="This is blue" color="blue"/>
        <Text text="This is red" color="red"/>
      </header>
    </div>
  );
}

export default App;