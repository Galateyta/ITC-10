import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Registry from './components/Registry.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Slider from './components/Slider.jsx'
import About from './components/About.jsx'


class App extends React.Component {
    render() {
        return (
          <div>

            <BrowserRouter>
                <div>
                    <Route path = '/' exact component = {Login}/>
                    <Route path = '/registry' exact component = {Registry}/>
                    <Route path = '/home' exact component = {Home}/>
                    <Route path = '/slider' exact component = {Slider}/>
                    <Route path = '/about' exact component = {About}/>
                  </div>
          </BrowserRouter>
          </div>
        );
    }
}

export default App;
