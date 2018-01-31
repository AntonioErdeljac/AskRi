import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Input } from '../common';

const Navbar = (props) => {
  const { currentUser, onClickLogout } = props;
  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <Link to="/" className="color-blue" href="#i">AskRi</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon color-blue" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto float-right">
          <li className="nav-item">
            <a className="nav-link active" href="#i">Početna <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#i">Pitanja <span className="sr-only">(current)</span></a>
          </li>
        </ul>
        <ul className="navbar-nav float-right">
          <li className="nav-item">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle c-invisible" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="http://unmr-nl.science.uu.nl/sites/default/files/user_placeholder_man_0.jpg" height="50" className="nav-img" alt="" />
              </button>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={onClickLogout}>Odjava</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  currentUser: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
  onClickLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () =>
    dispatch({ type: 'LOGOUT' }),
});

export default connect(null, mapDispatchToProps)(Navbar);
