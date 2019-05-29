import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CreateElement from './CreateElement.js';

class App extends Component { 
  render () {    
    return (
      <div className="App">
         <CreateElement text="I am" color = "red"/> 
         <CreateElement text="I am" color = "blue"/>
         <CreateElement text="I am" color = "green"/>
         <CreateElement text="I am" color = "yellow"/>
         <CreateElement text="I am" color = "black"/>     
      </div>
    );
  }
}

export default App;
