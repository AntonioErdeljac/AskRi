export default (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_PAGE_LOADED':
      return {
        ...state,
        profile: action.payload[0].user,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
