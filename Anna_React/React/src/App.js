import React from 'react';
import './App.css';

class MyComponent extends React.Component {
  render() {
    return <div style = {{'color': this.props.color}}>{this.props.text}</div>;
  }
}

class App extends React.Component {
  render() {
  return  <div>
            <div className='container'>
              <MyComponent text='first block' color='red' />
              <MyComponent text='second block' color='green' />
              <MyComponent text='third block' color='blue' />
            </div>
          </div>
  }
}

export default App;
  
