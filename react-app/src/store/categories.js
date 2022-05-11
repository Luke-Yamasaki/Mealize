const GOT_CATEGORIES = '/categories/GOT_CATEGORIES';

const gotCategories = payload => ({
    type: GOT_CATEGORIES,
    payload
});

export const getCategories = () => async (dispatch) => {
    const response = await fetch('/api/categories/');
    if(response.ok) {
        const data = await response.json();
        dispatch(gotCategories(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export default function categoriesReducer(state={}, action) {
    let newState = {...state};
    switch(action.type) {
        case GOT_CATEGORIES:
            newState = action.payload;
            return newState
        default:
            return state;
    };
};
