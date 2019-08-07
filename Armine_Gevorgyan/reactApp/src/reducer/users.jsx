const initialState = {};

export default(state, action) => {
  switch (action.type) {
    case 'LOAD_USER' :
      return {...state, user: action.data};
    default:
      return state;
  }
};
