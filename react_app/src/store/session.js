const USER_IS_SET = 'session/USER_IS_SET';
const REMOVED_USER = 'session/REMOVED_USER';
const REFRESHED_USER = 'session/REFRESHED_USER';
const ADDED_FAVORITE = 'session/ADDED_FAVORITE';
const REMOVED_FAVORITE = 'session/REMOVED_FAVORITE';
const SENT_MESSAGE = 'session/SENT_MESSAGE';
const GOT_MESSAGES = 'session/GOT_MESSAGES';
const GOT_ONE_MESSAGE = 'session/GOT_ONE_MESSAGE';
const CONNECTION_FAILED = 'session/CONNECTION_FAILED';

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

const sentMessage = payload => ({
    type: SENT_MESSAGE,
    payload
});

const gotMessages = payload => ({
    type: GOT_MESSAGES,
    payload
});

const gotOneMessage = payload => ({
    type: GOT_ONE_MESSAGE,
    payload
});

const connectionFailed = () => ({
    type: CONNECTION_FAILED
});

// action creators
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
        return null;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        dispatch(connectionFailed())
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
        dispatch(connectionFailed())
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
        return null;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        dispatch(connectionFailed())
    };
};

export const refreshUser = () => async (dispatch) => {
    const response = await fetch('/api/auth/');

    if(response.ok) {
        const data = await response.json();
        dispatch(refreshedUser(data));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        dispatch(connectionFailed())
    };
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
        dispatch(connectionFailed())
    };
    // return favorite;
};

export const removeFavorite = (postId) => async (dispatch) => {
    const response = await fetch('/api/favorites/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postId)
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
        dispatch(connectionFailed())
    };
    // return favorite;
};

export const sendMessage = (message) => async (dispatch) => {
    const response = await fetch('/api/messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
    if(response.ok) {
        const sent = await response.json();
        dispatch(sentMessage(sent));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        dispatch(connectionFailed())
    };
};

export const getMessages = () => async (dispatch) => {
    const response = await fetch('/api/messages/');

    if(response.ok) {
        const messages = await response.json();
        dispatch(gotMessages(messages));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        dispatch(connectionFailed())
    };
};

const initialState = { user:null };

export default function sessionReducer(state = initialState, action) {
    let newState = { ...state };
    console.log(newState)
    switch(action.type) {
        case USER_IS_SET:
            return { user: action.payload };
        case REMOVED_USER:
            return { user: null };
        case REFRESHED_USER:
            return { user: action.payload };
        case ADDED_FAVORITE:
            newState.user.favorites[action.payload.postId] = action.payload;
            return newState;
        case REMOVED_FAVORITE:
            delete newState.user.favorites[action.payload]; // Double check to see that payload is the removed id
            return newState;
        case SENT_MESSAGE:
            newState.user.messages[action.payload.id] = action.payload;
            return newState;
        case GOT_MESSAGES:
            newState.user.messages = action.payload;
            return newState;
        case GOT_ONE_MESSAGE:
            newState.user.messages[action.payload.id] = action.payload;
        case CONNECTION_FAILED:
            return newState;
    }
}
