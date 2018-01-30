import { applyMiddleware, createStore, combineReducers } from 'redux';

import { auth, common, feed } from './reducers';
import { authMiddleware, promiseMiddleware } from './middleware';

const reducer = combineReducers({
  auth,
  common,
  feed,
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware, authMiddleware));

export default store;
