const GOT_BATCHED_ORGANIZATIONS = '/organizations/GOT_BATCHED_ORGANIZATIONS';

const gotBatchedOrganizations = payload => ({
  type: GOT_BATCHED_ORGANIZATIONS,
  payload
});

// Do I need page number of some integer to send to Python for pagination?
export const getBatchedOrganizations = () => async dispatch => {
    const response = await fetch('/api/organizations/');

    if(response.ok) {
        const organizations = await response.json();
        dispatch(gotBatchedOrganizations(organizations));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};


export default function organizationsReducer(state = {}, action) {
    let newState = { ...state };
    switch(action.type) {
        case GOT_BATCHED_ORGANIZATIONS:
            newState = {...action.payload};
            return newState;
        default:
            return state;
    };
};
