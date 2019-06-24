import React from 'react';
import Red from './colors/red.jsx';
import Black from './colors/black.jsx';
import Grey from './colors/grey.jsx';
import Yellow from './colors/yellow.jsx';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div class='App'>
        <Red name='red'></Red>
        <Black name='black'></Black>
        <Grey name='grey'></Grey>
        <Yellow name='yellow'></Yellow>
      </div>
    );
  }
}

export default App;