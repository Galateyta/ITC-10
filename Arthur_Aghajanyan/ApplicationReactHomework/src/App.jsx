import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Registry from './components/Registry/Registry.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'

class App extends React.Component {
    render() {
        return (
          <div>

            <BrowserRouter>
                <div>
                    <Route path = '/' exact component = {Login}/>
                    <Route path = '/registry' exact component = {Registry}/>
                    <Route path = '/home' exact component = {Home}/>
                  </div>
          </BrowserRouter>
          </div>
        );
    }
}

export default App;
