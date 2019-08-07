import React from 'react';
import Color from 'react';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div className='App'>
        <Color name="green" style={{color: "green"}}></Color>
        <Color name="red" style={{color: "red"}}></Color>
        <Color name="blue" style={{color: "red"}}></Color>
      </div>
    );
  }
}
export default App;
