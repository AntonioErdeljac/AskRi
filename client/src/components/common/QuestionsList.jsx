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
      {questions && questions.length === 0 &&
      <div className="card">
        <div className="card-body">
          <h3 className="no-questions">
        Trenutno nema pitanja za tebe, podijeli svoj profil da biš dobio pitanja!
        <br />
            <a className="link-blue my-3" href={`http://www.askri.com/${currentUser.username}`}>www.askri.com/{currentUser.username}</a>
          </h3>
        </div>
      </div>}
    </div>
  );
};

export default QuestionsList;
