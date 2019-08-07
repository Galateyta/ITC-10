import { BrowserRouter, Route } from 'react-router-dom';
import Registry from './components/Registry/Registry';
import Login from './components/Login/Login';
import React from 'react';
import Home from './components/Profile/Home/Home'


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