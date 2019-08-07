const Reducer = (state = [], action) => {
    switch(action.type) {
       case "ADD_USER":
          return {...state, user: action.user};
      case "DELETE_USER":
         return {...state, user: {}};
       default:
          return state;
    }
}
export default Reducer;