const CREATED_POST = 'posts/CREATED_POST';
const GOT_ALL_POSTS = 'posts/GOT_ALL_POSTS';
const GOT_BATCHED_POSTS = 'posts/GOT_BATCHED_POSTS'
const UPDATED_POST = 'posts/UPDATED_POST';
const REMOVED_POST = 'posts/REMOVED_POST';

//actions
const createdPost = payload => ({
    type: CREATED_POST,
    payload
});

const gotAllPosts = (payload) => ({
    type: GOT_ALL_POSTS,
    payload
});

const gotBatchedPosts = (payload) => ({
    type: GOT_BATCHED_POSTS,
    payload
});

const updatedPost = payload => ({
    type: UPDATED_POST,
    payload
});

const removedPost = payload => ({
    type: REMOVED_POST,
    payload
});

// split actions in two parts, validate form and then dispatch the image to AWS

// action creators
export const postItem = (formData) => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if(response.ok) {
        const newPost = await response.json();
        dispatch(createdPost(newPost));
        return newPost;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data;
        };
    } else {
        return {'error': 'Connection failed. Please check your internet connection.'}
    }
};

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/');
    if(response.ok) {
        const posts = await response.json();
        dispatch(gotAllPosts(posts));
        return posts;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export const getBatchedPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/');
    if(response.ok) {
        const data = await response.json();
        dispatch(gotBatchedPosts(data));
        return null;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export const updateItem = (formData) => async (dispatch) => {
    const response = await fetch(`/api/posts/${formData.postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if(response.ok) {
        const data = await response.json();
        dispatch(updatedPost(data));
        return data
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export const removePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postId)
    });

    if(response.ok) {
        const postId = await response.json();
        dispatch(removedPost(postId));
        return postId;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export default function postsReducer(state = {}, action) {
    const newState = { ...state };
    switch(action.type) {
        case CREATED_POST:
            newState.all[action.payload?.id] = action.payload;
            return newState
        case GOT_ALL_POSTS:
            newState.all = action.payload;
            return newState
        case GOT_BATCHED_POSTS:
            newState.batched = action.payload;
            return newState;
        case UPDATED_POST:
            newState.all[action.payload?.id] = action.payload;
			return newState;
        case REMOVED_POST:
            delete newState.all[action.payload];
			return newState;
        default:
            return state;
    };
};
