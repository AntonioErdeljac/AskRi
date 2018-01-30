import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import agent from './agent';
import { Main } from './components/Main';

class App extends React.Component {
  componentWillMount() {
    const { onLoad } = this.props;
    const token = window.localStorage.getItem('jwt');

    if (token) {
      agent.setToken(token);
    }
    onLoad(token ? agent.Auth.current() : null, token);
  }
  render() {
    if (this.props.appLoaded) {
      return (<Main />);
    }
    return <div />;
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: 'APP_LOADED', payload, token }),
});

const mapStateToProps = state => ({
  ...state.common,
});

App.defaultProps = {
  appLoaded: false,
};

App.propTypes = {
  onLoad: PropTypes.func.isRequired,
  appLoaded: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
