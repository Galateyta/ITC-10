import React from 'react';
import Green from './components/green';
import Red from './components/red';
import Blue from './components/blue';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div className='App'>
        <Green name='green'></Green>
        <Red name='red'></Red>
        <Blue name='blue'></Blue>
      </div>
    );
  }
}
export default App;
