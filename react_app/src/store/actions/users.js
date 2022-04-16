const GOT_BATCHED_USERS = '/users/GOT_BATCHED_USERS';
const GOT_ONE_USER = '/users/GOT_ONE_USER';
const CONNECTION_FAILED = '/user/CONNECTION_FAILED';

const gotBatchedUsers = payload => ({
  type: GOT_BATCHED_USERS,
  payload
});

const gotOneUser = payload => ({
    type: GOT_ONE_USER,
    payload
});

const connectionFailed = () => ({
    type: CONNECTION_FAILED
})

// Do I need page number of some integer to send to Python for pagination?
export const getBatchedUsers = () => async dispatch => {
    const response = await fetch('/api/users/');

    if(response.ok) {
        const users = await response.json();
        dispatch(gotBatchedUsers(users));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        dispatch(connectionFailed())
    };
};

export const getOneUser = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`);

    if(response.ok) {
        const user = await response.json();
        dispatch(gotOneUser(user));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        dispatch(connectionFailed())
    };
};
