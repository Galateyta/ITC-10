const addUser = user => ({
    type: 'LOAD_USER',
    data: user 
});
const deleteUser = user => ({
    type: 'DELETE_USER',
    data: {}
});
export  { addUser, deleteUser };