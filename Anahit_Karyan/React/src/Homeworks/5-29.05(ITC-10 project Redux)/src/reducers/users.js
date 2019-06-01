const initialState = {};

function users(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_USER':{
            return {...state, user: action.payload}
        }
        case 'DELETE_USER': {
            return {...state, user: {}}
        }
        default : {
            return state;
        }
    }
}

export {users};
