import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import cn from 'classnames';

import { Input } from '../common';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log(this, value);
  }

  render() {
    const { currentUser, onClickLogout, location } = this.props;
    return (
      <span className="nav-span">
        <span className="d-none d-lg-block">
          <nav className="navbar fixed-top navbar-expand-lg bg-white">
            <Link to="/" className="color-blue" href="#i">PitajRi</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon color-blue" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto float-right">
                <li className="nav-item">
                  <Link to="/" className={cn('nav-link', { active: location.pathname === '/' })}>
                    <i className="fas fa-question-circle icon-nav mx-3" />Pitanja
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/${currentUser.username}`} className={cn('nav-link', { active: location.pathname === `/${currentUser.username}` })}>
                    <i className="fas fa-user mx-3 icon-nav" />Moj Profil
                  </Link>
                </li>
                <li className="nav-item border-left">
                  <Input
                    hideLabel
                    className="searchInput from-control-lg mt-1"
                    name="search"
                    handleChange={this.handleChange}
                    placeholder="Pronadi korisnika"
                  />
                </li>
              </ul>
              <ul className="navbar-nav float-right">
                <li className="nav-item mt-3">
                  <p className="nav-link">
                    {currentUser.username}
                  </p>
                </li>
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
        </span>
        <span className="d-none d-md-block d-sm-block d-block d-lg-none">
          <nav className="navbar navbar-expand-lg fixed-top text-center bg-white">
            <ul className="navbar-nav mx-auto float-right">
              <li className="nav-item">
                <Link to="/" className="color-blue text-center mr-auto">PitajRi</Link>
              </li>
            </ul>
          </nav>
          <nav className="text-center fixed-bottom bg-white">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <Link to="/" className={cn('nav-link', { active: location.pathname === '/' })}><i className="fas fa-question-circle icon-nav" /></Link>
                </div>
                <div className="col-4">
                  <Link to={`/${currentUser.username}`} className={cn('nav-link', { active: location.pathname === `/${currentUser.username}` })}><i className="fas fa-user icon-nav" /></Link>
                </div>
                <div className="col-4">
                  <Link to="/settings" className={cn('nav-link', { active: location.pathname === '/settings' })}><i className="fas fa-cogs icon-nav" /></Link>
                </div>
              </div>
            </div>
          </nav>
        </span>
      </span>
    );
  }
}

Navbar.propTypes = {
  currentUser: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
  onClickLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () =>
    dispatch({ type: 'LOGOUT' }),
});

Navbar.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
