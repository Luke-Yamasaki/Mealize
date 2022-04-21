const GOT_BATCHED_ORGANIZATIONS = '/organizations/GOT_BATCHED_ORGANIZATIONS';
const GOT_ONE_ORGANIZATION = '/organizations/GOT_ONE_ORGANIZATION';

const gotBatchedOrganizations = payload => ({
  type: GOT_BATCHED_ORGANIZATIONS,
  payload
});

const gotOneOrganization = payload => ({
    type: GOT_ONE_ORGANIZATION,
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

export const getOneOrganization = (organizationId) => async dispatch => {
    const response = await fetch(`/api/organizations/${organizationId}`);

    if(response.ok) {
        const organization = await response.json();
        dispatch(gotOneOrganization(organization));
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
        case GOT_ONE_ORGANIZATION:
            newState[action.payload] = action.payload;
            return newState;
        default:
            return state;
    };
};
