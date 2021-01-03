import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ToDo from './ToDo';

const reducers = combineReducers ({
    routing: routerReducer,
    toDo: ToDo,
});

export default reducers;
