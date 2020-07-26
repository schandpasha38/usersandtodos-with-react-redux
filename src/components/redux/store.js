import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userAndTodo from './reducers/rootReducer';

const persistedState = localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : {}

const store = createStore(userAndTodo, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
})

export default store