
const  userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_USER' : {
            return {...state, user: action.data}
        }
        case 'DELETE_USER': {
            return {...state, user: {}}
        }
        default : {
            return state;
        }
    }
}
export default userReducer;