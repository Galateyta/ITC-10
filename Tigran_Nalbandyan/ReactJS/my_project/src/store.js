import {createStore} from "redux";
import userReducer from "./reducers/userReducer";

function configureStore(state = {
  isAuthed: false,
  currentUser: {
    login: 'admin',
    password: 'admin123',
    name: 'Admin',
    surname: 'Adminich',
    dateOfBirthday: Date('19/03/1999'),
    gender: 'male',
    image: ''
  }
}) {
  return createStore(userReducer, state);
}

export default configureStore;