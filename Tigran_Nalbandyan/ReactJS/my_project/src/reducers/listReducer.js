export default(state, action) => {
  switch (action.type) {
    case "list":
      return {rotating: action.payload};
    default:
      return state;
  }
};
