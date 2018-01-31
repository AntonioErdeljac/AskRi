import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import agent from '../../agent';
import { QuestionsList } from '../common';

class Profile extends React.Component {
  componentWillMount() {
    const { match, onLoad } = this.props;

    onLoad(Promise.all([
      agent.Profile.get(match.params.username),
      agent.Questions.byUsername(match.params.username),
    ]));
  }
  render() {
    const { currentUser, questions } = this.props;
    return (
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3 col-12">
            <div className="card">
              <div className="card-body">
          test
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
});

const mapStateToProps = state => ({
  ...state.profile,
});

Profile.propTypes = {
  match: PropTypes.shape({}).isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
