import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducers from './reducers';
import rootSaga from './sagas';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import Routes from './components/routes';
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer,
  }),
  applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)),
);

sagaMiddleware.run(rootSaga);
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

