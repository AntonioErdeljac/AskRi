export default (state = {}, action) => {
  switch (action.type) {
    case 'FEED_PAGE_LOADED':
      return {
        ...state,
        questions: action.payload ? action.payload.questions : [],
      };
    case 'REMOVE_QUESTION':
      return {
        ...state,
        questions: state.questions.filter(question => question.id !== action.id),
      };
    default:
      return state;
  }
};
