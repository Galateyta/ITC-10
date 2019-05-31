import React from 'react';
import './App.css';
import Slider from './components/Slider/Slider.jsx'
import About from './components/About/About.jsx'
import Login from './components/Login/Login.jsx'
import MyTable from './components/Table/Table.jsx'
import { BrowserRouter, Route} from 'react-router-dom';
import Registry from './components/Registry/Registry.jsx'

import Home from './components/Home/Home.jsx'

class App extends React.Component {
    render() {
        return (
          <>
            <BrowserRouter>
                <div>
                    <Route path = '/' exact component = {Login}/>
                    <Route path = '/registry' exact component = {Registry}/>
                    <Route path = '/home' exact component = {Home}/>
                    <Route path='/home/table'
                        render={(props) => <Home {...props} component={< MyTable/>}/>}/>
                    <Route path='/home/slider'
                        render={(props) => <Home {...props} component={< Slider/>}/>}/>
                    <Route path='/home/about'
                        render={(props) => <Home {...props} component={< About/>}/>}/>
                </div>
          </BrowserRouter>
          </>
        );
    }
}

export default App;
