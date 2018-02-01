import { applyMiddleware, createStore, combineReducers } from 'redux';

import { auth, common, feed, profile, search } from './reducers';
import { authMiddleware, promiseMiddleware } from './middleware';

const reducer = combineReducers({
  auth,
  common,
  feed,
  profile,
  search,
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware, authMiddleware));

export default store;
