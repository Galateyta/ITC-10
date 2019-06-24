import {combineReducers} from 'redux';
import {users} from './users';
import {table} from './table';

const allReducer = combineReducers({
    table,
    users
})

export default allReducer;
