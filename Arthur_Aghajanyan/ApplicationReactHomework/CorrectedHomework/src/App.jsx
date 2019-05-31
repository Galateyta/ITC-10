import React from 'react';
import './App.css';
import Slider from './components/Slider/Slider.jsx'
import About from './components/About/About.jsx'
import Login from './components/Login/Login.jsx'
import MyTable from './components/Table/Table.jsx'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Registry from './components/Registry/Registry.jsx'

import Home from './components/Home/Home.jsx'

class App extends React.Component {  
    render() {
        return (
            <>
                <BrowserRouter>
                    <div>
                        <Route path='/' exact component={Login} />
                        <Route path='/registry' exact component={Registry} />
                        <Route path='/home' exact render={(props) => localStorage['signUp'] ? <Home/> : <Redirect to='/'/>}/>
                        <Route path='/home/table'
                            render={(props) => localStorage['signUp'] ? <Home {...props} component={< MyTable />} /> : <Redirect to='/'/>} />
                        <Route path='/home/slider'
                            render={(props) => localStorage['signUp'] ? <Home {...props} component={< Slider />} /> : <Redirect to='/'/>} />
                        <Route path='/home/about'
                            render={(props) =>  localStorage['signUp'] ? <Home {...props} component={< About />} /> : <Redirect to='/'/>} />
                    </div>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
