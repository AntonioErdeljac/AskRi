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
  handleIgnore(id) {
    const { onIgnore } = this.props;
    onIgnore(agent.Questions.delete(id), id);
  }
  render() {
    const { questions, currentUser } = this.props;
    return (
      <div className="container mt-3">
        <div className="row mt-3">
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
  currentUser: PropTypes.shape({}).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
