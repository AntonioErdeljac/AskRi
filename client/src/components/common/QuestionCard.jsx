import moment from 'moment';
import React from 'react';

const QuestionCard = (props) => {
  const { handleAnswer, handleIgnore, question } = props;
  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">
          <img src="http://unmr-nl.science.uu.nl/sites/default/files/user_placeholder_man_0.jpg" height="50" width="50" className="nav-img mr-3" alt="" />
                  Riječanin <span className="text-muted">pita:</span>
        </h5>
        <p className="card-text">{question.question}</p>
        <h6 className="card-subtitle mb-2 text-muted mt-3">{moment(new Date(question.createdAt)).fromNow()}</h6>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary">Odgovori</button>
        <button
          onClick={() => handleIgnore(question.id)}
          className="btn btn-danger mx-3"
        >
        Ignoriraj
        </button>
        <i className="fa fa-star-o fa-2x  c-favorite float-right" />
      </div>
    </div>
  );
};

export default QuestionCard;
