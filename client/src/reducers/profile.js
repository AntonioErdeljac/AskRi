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
    default:
      return state;
  }
};
