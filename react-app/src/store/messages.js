const GOT_BOARDS = 'message/GOT_BOARDS';
const SENT_MESSAGE = 'message/SENT_MESSAGE';
const SENT_REPLY = 'message/SENT_REPLY';
const EDITED_MESSAGE = 'message/EDITED_MESSAGE';
const DELETED_MESSAGE = 'message/DELETED_MESSAGE';
const DELETED_CONVERSATION = 'message/DELETED_CONVERSATION';

const gotBoards = payload => ({
    type: GOT_BOARDS,
    payload
});

const sentMessage = payload => ({
    type: SENT_MESSAGE,
    payload
});

const sentReply = payload => ({
    type: SENT_REPLY,
    payload
})

const editedMessage = payload => ({
    type: EDITED_MESSAGE,
    payload
})

const deletedMessage = payload => ({
    type: DELETED_MESSAGE,
    payload
});

const deletedConversation = payload => ({
    type: DELETED_CONVERSATION,
    payload
});

export const getBoards = () => async (dispatch) => {
    const response = await fetch('/api/messages/');
    console.log(response)
    if(response.ok) {
        const messages = await response.json();
        dispatch(gotBoards(messages));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

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
        console.log(response)
        return 'Connection failed. Please check your internet connection.'
    };
};

export const sendReply= (messageData) => async (dispatch) => {
    const response = await fetch('/api/messages/reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    });
    if(response.ok) {
        const sent = await response.json();
        dispatch(sentReply(sent));
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
    const response = await fetch(`/api/messages/${message.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
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
};

export const deleteMessage = (id) => async (dispatch) => {
    const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
    );
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
};

export const deleteConversation = (id) => async (dispatch) => {
    const response = await fetch(`/api/messages/conversations/${id}`, {
        method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });
    if(response.ok) {
        const boardId = await response.json();
        dispatch(deletedConversation(boardId));
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export default function messageBoardsReducer(state = {}, action) {
    let newState = {...state}
    switch(action.type) {
        case GOT_BOARDS:
            newState = action.payload;
            return newState;
        case SENT_MESSAGE:
            if(newState === null){
                newState[action.payload.id] = action.payload
            } else {
                newState[action.payload.id] = action.payload
            };
            return newState;
        case SENT_REPLY:
            const replyState = {...state, ...state.messages};
            replyState[action.payload.id] = action.payload;
            return replyState;
        case EDITED_MESSAGE:
            const editedState = {...state, ...state.messages};
            editedState[action.payload.id] = action.payload;
            return editedState;
        case DELETED_MESSAGE:
            const deletedState = {...state, ...state.messages};
            console.log(action.payload)
            deletedState[action.payload.id] = action.payload;
            console.log(deletedState)
            return deletedState;
        case DELETED_CONVERSATION:
            delete newState[action.payload.boardId];
            return newState;
        default:
            return state;
    };
};
