import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

import { Errors } from '../common';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      answer: '',
    };

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ answer: value });
  }

  handleAnswer() {
    const { showInput, answer } = this.state;
    const { submitAnswer, question } = this.props;

    if (!showInput) {
      this.setState({ showInput: !showInput });
    } else {
      submitAnswer(agent.Questions.answer(question.id, answer));
    }
  }

  render() {
    const { currentUser, handleIgnore, question, errors } = this.props;
    return (
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">
            <img src="http://unmr-nl.science.uu.nl/sites/default/files/user_placeholder_man_0.jpg" height="50" width="50" className="nav-img mr-3" alt="" />
            Riječanin <span className="text-muted">pita:</span>
          </h5>
          <p className="card-text">{question.question}</p>
          <h6 className="card-subtitle mb-2 text-muted my-3">{moment(new Date(question.createdAt)).fromNow()}</h6>
          <p>{question.answer}</p>
        </div>
        {currentUser && currentUser.username === question.receiver.username && !question.answer ?
          <div className="card-footer">
            <Errors errors={errors} />
            {this.state.showInput && <textarea onChange={ev => this.handleChange(ev.target.value)} className="form-control my-3" />}
            <button disabled={this.state.answer.length === 0 && this.state.showInput} className="btn btn-primary" onClick={this.handleAnswer}>Odgovori</button>
            <button
              onClick={() => handleIgnore(question.id)}
              className="btn btn-danger mx-3"
            >
              Ignoriraj
            </button>
          </div>
      : null}
        {currentUser && currentUser.username === question.receiver.username && question.answer ?
          <div className="card-footer">
            <button
              onClick={() => handleIgnore(question.id)}
              className="btn btn-danger"
            >
              Izbriši
            </button>
          </div>
      : null}
      </div>
    );
  }
}

QuestionCard.defaultProps = {
  currentUser: null,
  handleIgnore: null,
  errors: null,
};

QuestionCard.propTypes = {
  submitAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({}).isRequired,
  currentUser: PropTypes.shape({}),
  handleIgnore: PropTypes.func,
  errors: PropTypes.shape({}),
};

const mapDispatchToProps = dispatch => ({
  submitAnswer: payload =>
    dispatch({ type: 'SUBMIT_ANSWER', payload }),
});

const mapStateToProps = state => ({
  errors: state.feed.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
