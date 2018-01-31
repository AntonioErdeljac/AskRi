import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Navbar, Feed } from '../Main';

const Home = (props) => {
  const { currentUser } = props;
  return (
    <Feed />
  );
};

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
});

Home.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, null)(Home);
