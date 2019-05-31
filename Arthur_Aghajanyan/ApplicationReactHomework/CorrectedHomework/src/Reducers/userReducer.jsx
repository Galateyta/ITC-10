const userReducer = (state = [], action) => {
    switch(action.type) {
       case "ADD":
          return {...state, user: action.user};
      case "DEL":
         return {...state, user: {}};
       default:
          return state;
    }
}
export default userReducer;
