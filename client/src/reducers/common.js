export default (state = {}, action) => {
  switch (action.type) {
    case 'APP_LOADED':
      return {
        ...state,
        token: action.token || null,
        currentUser: action.payload ? action.payload.user : null,
        appLoaded: true,
      };
    case 'REDIRECT':
      return {
        ...state,
        redirectTo: null,
      };
    case 'LOGIN':
      return {
        ...state,
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user,
        redirectTo: action.error ? null : '/',
      };
    default:
      return state;
  }
};
