const SENT_REQUEST = 'session/SETNT_REQUEST';
const SENT_MESSAGE = 'session/SENT_MESSAGE';
const GOT_MESSAGES = 'session/GOT_MESSAGES';
const GOT_ONE_MESSAGE = 'session/GOT_ONE_MESSAGE';
const DELETED_MESSAGE = 'session/DELETED_MESSAGE';

const sentRequest = payload => ({
    type: SENT_REQUEST,
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

const deletedMessage = payload => ({
    type: DELETED_MESSAGE,
    payload
});

export const createRequest = (request) => async (dispatch) => {
    const response = await fetch('/api/messages/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(request)
    });
    if(response.ok) {
        const message = await response.json();
        dispatch(sentRequest(message))
    }
}

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
        return 'Connection failed. Please check your internet connection.'
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
        return 'Connection failed. Please check your internet connection.'
    };
};

export const getOneMessage = (id) => async (dispatch) => {
    const response = await fetch(`/api/messages/${id}`);

    if(response.ok) {
        const message = await response.json();
        dispatch(gotOneMessage(message));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export const deleteMessage = (id) => async (dispatch) => {
    const response = await fetch(`/api/messages/${id}`);
    if(response.ok) {
        const messageId = await response.json();
        dispatch(deletedMessage(messageId));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };

}

export default function messagesReducer(state = {}, action) {
    let newState = {...state};
    switch(action.type) {
        case SENT_REQUEST:
            newState[action.payload.]

        case SENT_MESSAGE:
            newState[action.payload.id] = action.payload;
            return newState;
        case GOT_MESSAGES:
            newState.messages = action.payload;
            return newState;
        case GOT_ONE_MESSAGE:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETED_MESSAGE:
            delete newState[action.payload.id];
            return newState;
        default:
            return state;
    };
};
