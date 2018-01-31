import PropTypes from 'prop-types';
import React from 'react';

import { QuestionCard } from '../common';

const QuestionsList = (props) => {
  const { currentUser, questions, handleAnswer, handleIgnore } = props;
  return (
    <div className="col-md-6 offset-md-3 col-12 mt-3">
      {(questions || []).map(question => (
        <QuestionCard
          currentUser={currentUser}
          key={question.id}
          handleAnswer={handleAnswer}
          handleIgnore={handleIgnore}
          question={question}
        />
      ))}
    </div>
  );
};

export default QuestionsList;
