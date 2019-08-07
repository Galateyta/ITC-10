import React from 'react';
import './App.css';
import TextAndColor from './TextAndColor.jsx'

class App extends React.Component {
    render(){
      return (
            <div className="parent-component">
                <TextAndColor name="Hello" textColor="red"/>
                <TextAndColor name="React" textColor="yellow"/>
                <TextAndColor name="My" textColor="blue"/>
                <TextAndColor name="First" textColor="green"/>
                <TextAndColor name="Project" textColor="orange"/>
            </div>
      );
    }
}
export default App;
