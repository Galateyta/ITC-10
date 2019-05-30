import React,{Component} from 'react';
import './App.css';
import {Login} from './components/Login'
import {Registration} from './components/Registration'
import {Home} from './components/Home'
import {Navbar} from './components/Navbar'
import {Content} from './components/Content'
import {BrowserRouter, Route} from 'react-router-dom'


class App extends Component{
	render () {
  return (
		<BrowserRouter>
	    <div className="app-wrapper">
				<Route exact path="/" component={Login}/>
				<Route exact path="/regisr" component={Registration}/>
				<Route exact path="/content" component={Content}/>

	    </div>
		</BrowserRouter>
  );
}
}
export default App;
