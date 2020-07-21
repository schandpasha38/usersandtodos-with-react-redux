import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import userAndTodo from './reducers/rootReducer';

const persistedState = localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : {}

const store = createStore(userAndTodo, persistedState, applyMiddleware(thunk, logger));

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
})

export default store