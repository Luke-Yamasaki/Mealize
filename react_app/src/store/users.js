const GOT_BATCHED_USERS = '/users/GOT_BATCHED_USERS';
const GOT_ONE_USER = '/users/GOT_ONE_USER';

const gotBatchedUsers = payload => ({
  type: GOT_BATCHED_USERS,
  payload
});

const gotOneUser = payload => ({
    type: GOT_ONE_USER,
    payload
});

// Do I need page number of some integer to send to Python for pagination?
export const getBatchedUsers = () => async dispatch => {
    const response = await fetch('/api/users/');

    if(response.ok) {
        const users = await response.json();
        dispatch(gotBatchedUsers(Object.values(users)));
        return users
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export const getOneUser = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`);

    if(response.ok) {
        const user = await response.json();
        dispatch(gotOneUser(user));
        return user
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export default function usersReducer(state = {}, action) {
    let newState = { ...state };
    switch(action.type) {
        case GOT_BATCHED_USERS:
            action.payload.forEach(user => newState[user.id] = user)
            return newState;
        case GOT_ONE_USER:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    };
};
