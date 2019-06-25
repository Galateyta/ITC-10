export default(state, action) => {
  switch (action.type) {
    case 'currentUserUpdate':
      return {...state, currentUser: action.payload.currentUser};
    default:
      return state;
  }
};
