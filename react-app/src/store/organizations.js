const GOT_BATCHED_ORGANIZATIONS = '/organizations/GOT_BATCHED_ORGANIZATIONS';
const GOT_ONE_ORGANIZATION = '/organizations/GET_ONE_ORGANIZATION';

const gotBatchedOrganizations = payload => ({
  type: GOT_BATCHED_ORGANIZATIONS,
  payload
});

const gotOneOrganization = payload => ({
    type: GOT_ONE_ORGANIZATION,
    payload
})

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

export const getOneOrganization = (id) => async dispatch => {
    const response = await fetch(`/api/organizations/${id}`);

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
    switch(action.type) {
        case GOT_BATCHED_ORGANIZATIONS:
            const newState = {businesses:{...state.businesses}, nonprofits:{...state.nonprofits}, session:{...state.session}};
            newState.businesses = action.payload.businesses;
            newState.nonprofits = action.payload.nonprofits;
            return newState;
        case GOT_ONE_ORGANIZATION:
            const sessionState = {businesses:{...state.businesses}, nonprofits: {...state.nonprofits}, session: {...state.session}}
            sessionState.session = action.payload;
            return sessionState;
        default:
            return state;
    };
};
