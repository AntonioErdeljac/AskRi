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
      showSuccess: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccessToggle = this.handleSuccessToggle.bind(this);
    this.handleIgnore = this.handleIgnore.bind(this);
  }

  componentWillMount() {
    const { match, onLoad } = this.props;

    onLoad(Promise.all([
      agent.Profile.get(match.params.username),
      agent.Questions.byUsername(match.params.username),
    ]));
  }

  componentWillUnmount() {
    const { onUnload } = this.props;

    onUnload();
  }

  handleSubmit(ev) {
    const { onSubmit, match } = this.props;
    const { showSuccess } = this.state;
    ev.preventDefault();

    if (!showSuccess) {
      this.setState({ question: '', showSuccess: true });
      onSubmit(agent.Questions.new(match.params.username, this.state.question));
    } else {
      this.setState({ showSuccess: false });
    }
  }

  handleSuccessToggle() {
    const { showSuccess } = this.state;
    this.setState({ showSuccess: !showSuccess });
  }

  handleChange(value) {
    this.setState({ question: value });
  }

  handleIgnore(id) {
    const { onIgnore } = this.props;
    onIgnore(agent.Questions.delete(id), id);
  }

  render() {
    const { currentUser, questions, match } = this.props;
    const { showSuccess } = this.state;
    return (
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3 col-12 mt-3">
            <div className="card mt-3">
              <div className="card-body">
                <div className="card-text">
                  Pitaj <b>@{match.params.username}</b>
                  {showSuccess ?
                    <div className=" my-3 success-message">
                      <div>
                        Vaša poruka je poslana!
                      </div>
                    </div>
                  :
                    <textarea value={this.state.question} onChange={ev => this.handleChange(ev.target.value)} placeholder="Postavi mi pitanje" className="form-control my-3" />
                  }
                  <button onClick={this.handleSubmit} className="btn btn-primary">{showSuccess ? 'Pitaj ponovo' : 'Pošalji'}</button>
                </div>
              </div>
            </div>
          </div>
          <QuestionsList
            handleIgnore={this.handleIgnore}
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
  onIgnore: (payload, id) =>
    dispatch({ type: 'REMOVE_QUESTION', payload, id }),
  onUnload: () =>
    dispatch({ type: 'PROFILE_PAGE_UNLOADED' }),
});

const mapStateToProps = state => ({
  ...state.profile,
  ...state.feed,
  currentUser: state.common.currentUser,
});

Profile.defaultProps = {
  currentUser: null,
  questions: [],
};

Profile.propTypes = {
  match: PropTypes.shape({}).isRequired,
  onLoad: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
  questions: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
