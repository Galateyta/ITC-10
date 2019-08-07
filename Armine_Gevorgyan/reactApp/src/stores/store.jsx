import user from "../reducer/users";
import {createStore} from "redux";


function initStore(state = {
  user: {}
}) {
  return createStore(user, state);
}

export default initStore;
