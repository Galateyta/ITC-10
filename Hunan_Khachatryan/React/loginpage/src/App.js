import React from 'react';
import Login from './Components/Login/Login';
import Registry from './Components/Registry/Registry';
import Home from './Components/Profile/Home/Home';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div>

        <BrowserRouter>
          <div>
            <Route path='/' exact component={Login} />
            <Route path='/registry' exact component={Registry} />
            <Route path='/home' exact component={Home} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;