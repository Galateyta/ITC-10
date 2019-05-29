import {createStore} from "redux";
import listReducer from "./reducers/listReducer";

function configureStore(state = {
  isAuthed: false
}) {
  return createStore(listReducer, state);
}

export default configureStore;