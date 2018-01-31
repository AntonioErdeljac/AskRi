import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import agent from '../../agent';
import { QuestionsList } from '../common';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { match, onLoad } = this.props;

    onLoad(Promise.all([
      agent.Profile.get(match.params.username),
      agent.Questions.byUsername(match.params.username),
    ]));
  }

  handleSubmit(ev) {
    const { onSubmit, match } = this.props;
    ev.preventDefault();

    onSubmit(agent.Questions.new(match.params.username, this.state.question));
  }

  handleChange(value) {
    this.setState({ question: value });
  }

  render() {
    const { currentUser, questions, match } = this.props;
    return (
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3 col-12">
            <div className="card">
              <div className="card-body">
                <p className="card-text">
                  Pitaj <b>@{match.params.username}</b>
                  <textarea value={this.state.question} onChange={ev => this.handleChange(ev.target.value)} placeholder="Postavi mi pitanje" className="form-control my-3" />
                  <button onClick={this.handleSubmit} className="btn btn-primary">Pošalji</button>
                </p>
              </div>
            </div>
          </div>
          <QuestionsList
            currentUser={currentUser}
            questions={questions}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
  onSubmit: payload =>
    dispatch({ type: 'SEND_QUESTION', payload }),
});

const mapStateToProps = state => ({
  ...state.profile,
  currentUser: state.common.currentUser,
});

Profile.propTypes = {
  match: PropTypes.shape({}).isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
