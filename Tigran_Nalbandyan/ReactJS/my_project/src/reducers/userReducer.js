export default(state, action) => {
  switch (action.type) {
    case 'currentUserUpdate':
      return {...state, currentUser: action.payload.currentUser, isAuthed: action.payload.isAuthed};
    default:
      return state;
  }
};
