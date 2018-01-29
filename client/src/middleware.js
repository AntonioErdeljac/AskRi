import agent from './agent';

const isPromise = promise => promise && typeof promise.then === 'function';

const promiseMiddleware = store => next => (action) => {
  const newAction = action;
  if (isPromise(action.payload)) {
    action.payload.then(
      (res) => {
        newAction.payload = res;
        store.dispatch(newAction);
      },
      (error) => {
        newAction.error = true;
        newAction.payload = error.response.body;
        store.dispatch(newAction);
      },
    );
    return;
  }
  next(newAction);
};

const authMiddleware = () => next => (action) => {
  if (action.type === 'LOGIN' || action.type === 'REGISTER') {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }
  next(action);
};

export {
  authMiddleware,
  promiseMiddleware,
};
