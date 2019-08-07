import * as actionTypes from '../actions/actionTypes';
const initialState={};
export default (state = {}, action) => {
    switch (action.type){
      case actionTypes.LOGIN_USER:
      return {
        ...state,
        ...action.data
      };
      case actionTypes.LOGOUT_USER:
      return {
        ...initialState
      };
      default:
            return state;
    }
  };