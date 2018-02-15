import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { QuestionsList } from '../common';
import agent from '../../agent';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.handleIgnore = this.handleIgnore.bind(this);
  }
  componentWillMount() {
    const { onLoad } = this.props;

    onLoad(agent.Questions.private());
  }

  componentWillUnmount() {
    const { onUnload } = this.props;

    onUnload();
  }

  handleIgnore(id) {
    const { onIgnore } = this.props;
    onIgnore(agent.Questions.delete(id), id);
  }
  render() {
    const { questions, currentUser } = this.props;
    return (
      <div className="container mt-3">
        <div className="row mt-3">
          {questions && questions.length === 0 &&
          <div className="col-md-6 offset-md-3 col-12 mt-3">
            <div className="card mt-3">
              <div className="card-body text-center">
                <h3 className="no-questions">
                  Trenutno nema pitanja za tebe, podijeli ili stavi ovo na svoj story da biš dobio pitanja!
                  <br />
                  <hr />
                  <a className="link-blue my-3 text-center special-link" href={`http://www.pitajri.com/${currentUser.username}`}>www.pitajri.com/{currentUser.username}</a>
                </h3>
              </div>
            </div>
          </div>}
          {questions && questions.length > 0 &&
          <div className="col-md-6 offset-md-3 col-12 mt-3">
            <div className="card mt-3">
              <div className="card-body text-center">
                <h3 className="no-questions">
                  Podijeli svoj link!
                  <br />
                  <hr />
                  <a className="link-blue my-3 text-center special-link" href={`http://www.pitajri.com/${currentUser.username}`}>www.pitajri.com/{currentUser.username}</a>
                </h3>
              </div>
            </div>
          </div>}
          <QuestionsList
            currentUser={currentUser}
            handleIgnore={this.handleIgnore}
            questions={questions}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'FEED_PAGE_LOADED', payload }),
  onIgnore: (payload, id) =>
    dispatch({ type: 'REMOVE_QUESTION', payload, id }),
  onUnload: () =>
    dispatch({ type: 'FEED_PAGE_UNLOADED' }),
});

const mapStateToProps = state => ({
  ...state.feed,
  currentUser: state.common.currentUser,
});

Feed.defaultProps = {
  questions: null,
};

Feed.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  onUnload: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
