export default (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_PAGE_LOADED':
      return {
        ...state,
        questions: action.payload ? action.payload[1].questions : [],
      };
    case 'FEED_PAGE_UNLOADED':
      return {};
    case 'PROFILE_PAGE_UNLOADED':
      return {};
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
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        questions: state.questions.map((question) => {
          if (question.id === action.payload.question.id) {
            return action.payload.question;
          }
          return question;
        }),
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
