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
        questions: action.payload.question ? state.questions.map((question) => {
          if (question.id === action.payload.question.id) {
            return action.payload.question;
          }
          return question;
        }) : state.questions,
        errors: action.error ? action.payload.errors : null,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
