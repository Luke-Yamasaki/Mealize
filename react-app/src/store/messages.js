const SENT_MESSAGE = 'message/SENT_MESSAGE';
const GOT_MESSAGES = 'message/GOT_MESSAGES';
const GOT_ONE_MESSAGE = 'message/GOT_ONE_MESSAGE';
const EDITED_MESSAGE = 'message/EDITED_MESSAGE';
const DELETED_MESSAGE = 'message/DELETED_MESSAGE';

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

const editedMessage = payload => ({
    type: EDITED_MESSAGE,
    payload
})

const deletedMessage = payload => ({
    type: DELETED_MESSAGE,
    payload
});

export const sendMessage = (messageData) => async (dispatch) => {
    const response = await fetch('/api/messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
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

export const editMessage = (message) => async (dispatch) => {
    const response = await fetch(`/api/messages/${message.id}`);
    if(response.ok) {
        const newMessage = await response.json();
        dispatch(editedMessage(newMessage));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };

}

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
        case SENT_MESSAGE:
            newState[action.payload.id] = action.payload;
            return newState;
        case GOT_MESSAGES:
            newState = action.payload;
            return newState;
        case GOT_ONE_MESSAGE:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDITED_MESSAGE:
                newState[action.payload.id] = action.payload;
                return newState;
        case DELETED_MESSAGE:
            delete newState[action.payload.id];
            return newState;
        default:
            return state;
    };
};
