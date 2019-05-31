const userReducer = (state = [], action) => {
    switch(action.type) {
       case "ADD":
          alert("1");
          return state.concat([action.data])
       default:
          return state;
    }
}
export default userReducer;
