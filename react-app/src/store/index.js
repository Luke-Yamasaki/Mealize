import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import usersReducer from './users';
import organizationsReducer from './organizations';
import postsReducer from './posts';
import deliveriesReducer from './deliveries';
import messageBoardsReducer from './messages';
import categoriesReducer from './categories';

import modals from './modal';

const rootReducer = combineReducers({
    session: sessionReducer,
    categories: categoriesReducer,
    organizations: organizationsReducer,
    users: usersReducer,
    posts: postsReducer,
    deliveries: deliveriesReducer,
    messageBoards: messageBoardsReducer,
    modals
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
