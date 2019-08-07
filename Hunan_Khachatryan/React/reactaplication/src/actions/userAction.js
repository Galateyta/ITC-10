
import * as actionTypes from './actionTypes';

const addUser = (user) => {
    return {
      type: actionTypes.LOGIN_USER,
      data: user
    }
  };
  const delUser = (user) => {
    return {
      type: actionTypes.LOGOUT_USER,
      data: user
    }
  };
  export  {addUser,delUser};