import {createStore} from "redux";
import userReducer from "./reducers/userReducer";

function configureStore(state = {
  currentUser: {}
}) {
  return createStore(userReducer, state);
}

export default configureStore;