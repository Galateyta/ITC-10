import React, {Component} from 'react';
import { Nav, NavItem, NavLink ,Container} from 'reactstrap';
import './home.css'

class Home extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: localStorage.getItem('registredUsersName'),
        surname:  localStorage.getItem('registredUsersSurname'),
        email: '',
        password: '',
        date: localStorage.getItem('registredUsersDate')
      };

    }
        render() {

          return (
              <Container >
                  <div className = 'home-style'>
                      <div className = 'left-container'>
                          <div className = 'user-style'>
                              <img src = 'https://image.flaticon.com/icons/png/512/149/149071.png' alt = 'img'/>
                              <p>{this.state.name}</p>
                              <p>{this.state.surname}</p>
                              <p>{this.state.date}</p>
                          </div>
                          <div className = 'nav-style'>
                             <Nav vertical>
                                 <NavItem>
                                     <NavLink href = '/home/slider'>Slider</NavLink>
                                     <hr/>
                                 </NavItem>
                               <NavItem>
                                   <NavLink href = '/home/about'>About</NavLink>
                                   <hr/>
                               </NavItem>
                               <NavItem>
                                   <NavLink href = '/home/table'>Table</NavLink>
                                   <hr/>
                               </NavItem>
                               <NavItem>
                                  <NavLink href = '/'>logout</NavLink>
                               </NavItem>
                             </Nav>
                          </div>
                      </div>
                      <div className = 'right-container'>
                        <h1>Home page</h1>
                      </div>
                  </div>
              </Container>
     );
    }

}
export default Home;
