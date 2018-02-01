export default (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_USERS':
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
