export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD_AUTH':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'LOGIN':
      return {
        ...state,
        errors: action.error ? action.payload.errors : null,
      };
    default:
      return state;
  }
};
