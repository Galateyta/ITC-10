import React,{Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Registration} from './components/registr/Registration';
import Login from './components/login/Login';
import Home from './components/home/Home';
import {Slider} from './components/slider/Slider';
import {Mycards} from './components/card/Cardss';
import {Table} from './table/Table';
import './App.css';  

class App extends Component{
	render () {
  return (
		<BrowserRouter>
	    <div className="app-wrapper">
				<Route exact path="/registr"  component={Registration}/>
				<Route exact path="/login"  component={Login}/>
				<Route exact path="/" component={Home} />
				<Route path='/slider' render={(props) => <Home  {...props}  component={< Slider />}/>}/ >
				<Route exact path="/about" render={(props) => <Home  {...props} component={<Mycards />}/>} />
				<Route exact path="/table"  render={(props) => <Home  {...props}  component={<Table />}/>}/>
	    </div>

		</BrowserRouter>
  );
}
}
export default App;
