export default (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_PAGE_LOADED':
      return {
        ...state,
        loadedProfile: action.payload ? action.payload[0].profile : null,
        profilePageLoaded: true,
      };
    case 'LOGOUT':
      return {};
    case 'SEND_QUESTION':
      return {
        ...state,
        question: action.payload ? action.payload.question : null,
        errors: action.error ? action.payload.errors : null,
      };
    default:
      return state;
  }
};
