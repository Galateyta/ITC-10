import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Registry from './components/Registry/Registry.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Slider from './components/Slider/Slider.jsx'
import About from './components/About/About.jsx'
import MyTable from './components/Table/Table.jsx'


class App extends React.Component {
    render() {
        return (
          <div>

            <BrowserRouter>
                <div>
                    <Route path = '/' exact component = {Login}/>
                    <Route path = '/registry' exact component = {Registry}/>
                    <Route path = '/home' exact component = {Home}/>
                    <Route path = '/home/slider' exact component = {Slider}/>
                    <Route path = '/home/about' exact component = {About}/>
                    <Route path = '/home/table' exact component = {MyTable}/>
                  </div>
          </BrowserRouter>
          </div>
        );
    }
}

export default App;
