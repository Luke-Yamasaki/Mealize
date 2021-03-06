const USER_IS_SET = '/session/USER_IS_SET';
const REMOVED_USER = '/session/REMOVED_USER';
const REFRESHED_USER = '/session/REFRESHED_USER';
const ADDED_FAVORITE = '/session/ADDED_FAVORITE';
const REMOVED_FAVORITE = '/session/REMOVED_FAVORITE';
// const SENT_MESSAGE = '/session/SENT_MESSAGE';
// const GOT_MESSAGES = '/session/GOT_MESSAGES';
// const GOT_ONE_MESSAGE = '/session/GOT_ONE_MESSAGE';

//actions
const userIsSet = payload => ({
    type: USER_IS_SET,
    payload
});

const removedUser = () => ({
    type: REMOVED_USER,
});

const refreshedUser = payload => ({
    type: REFRESHED_USER,
    payload
});

const addedFavorite = payload => ({
    type: ADDED_FAVORITE,
    payload
});

const removedFavorite = payload => ({
    type: REMOVED_FAVORITE,
    payload
});

// const sentMessage = payload => ({
//     type: SENT_MESSAGE,
//     payload
// });

// const gotMessages = payload => ({
//     type: GOT_MESSAGES,
//     payload
// });

// const gotOneMessage = payload => ({
//     type: GOT_ONE_MESSAGE,
//     payload
// });

// action creators
export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const user = await response.json();
		if (user.errors) {
			return;
		}
		dispatch(userIsSet(user));
	}
};

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(userIsSet(data));
        return data;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    }
};

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        dispatch(removedUser());
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export const signup = (data) => async (dispatch) => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response.ok) {
        const data = await response.json();
        dispatch(userIsSet(data));
        return data;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else if (response.status === 500) {
        return {'errors': 'Form did not submit. Check all fields.'}
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export const refreshUser = (sessionUser) => async (dispatch) => {
    dispatch(refreshedUser(sessionUser));
};

export const addFavorite = (postId) => async (dispatch) => {
    const response = await fetch('/api/favorites/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postId)
    });

    if(response.ok) {
        const favorite = await response.json();
        dispatch(addedFavorite(favorite));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
    // return favorite;
};

export const removeFavorite = (favoriteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favoriteId)
    });

    if(response.ok) {
        const removedId = await response.json();
        dispatch(removedFavorite(removedId));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
    // return favorite;
};

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case USER_IS_SET:
            return { user: action.payload };
        case REMOVED_USER:
            return { user: null };
        case REFRESHED_USER:
            return { user: action.payload };
        case ADDED_FAVORITE:
            const newFavoritesState = {
                user: {
                    ...state.user,
                    favorites: {
                        ...state.user.favorites
                    }
                }
            };
            newFavoritesState.user.favorites[action.payload.postId] = action.payload;
            return newFavoritesState;
        case REMOVED_FAVORITE:
              const removedFavoritesState = {
                user: {
                    ...state.user,
                    favorites: {
                        ...state.user.favorites
                    }
                }
            };
            delete removedFavoritesState.user.favorites[action.payload]; // Double check to see that payload is the removed id
            // return removedFavoritesState;
            return removedFavoritesState;
        default:
            return state;
        // case SENT_MESSAGE:
        //     newState.user.messages[action.payload.id] = action.payload;
        //     return newState;
        // case GOT_MESSAGES:
        //     newState.user.messages = action.payload;
        //     return newState;
        // case GOT_ONE_MESSAGE:
        //     newState.user.messages[action.payload.id] = action.payload;
    };
};
