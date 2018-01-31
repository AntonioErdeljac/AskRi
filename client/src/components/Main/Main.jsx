import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Landing, Home, Profile, Navbar } from '../Main';

class Main extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { history, onRedirect } = this.props;
    const { redirectTo } = nextProps;
    if (redirectTo) {
      history.push(redirectTo);
      onRedirect();
    }
  }

  render() {
    const { currentUser } = this.props;
    return (
      <span>
        {currentUser && <Navbar currentUser={currentUser} />}
        <Switch>
          <Route path="/" exact component={currentUser ? Home : Landing} />
          <Route path="/:username" exact component={Profile} />
        </Switch>
      </span>
    );
  }
}

Main.defaultProps = {
  redirectTo: null,
  history: null,
  currentUser: null,
};

Main.propTypes = {
  redirectTo: PropTypes.string,
  history: PropTypes.shape({}),
  onRedirect: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  ...state.common,
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch({ type: 'REDIRECT' }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
