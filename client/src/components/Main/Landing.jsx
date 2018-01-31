import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import agent from '../../agent';
import { Input, Errors } from '../common';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      register: false,
      login: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleType = this.handleToggleType.bind(this);
  }

  componentWillUnmount() {
    const { onUnload } = this.props;
    onUnload();
  }

  handleChange(value, key) {
    const { onChange } = this.props;

    onChange(value, key);
  }

  handleToggleType() {
    const { register, login } = this.state;
    this.setState({ register: !register, login: !login });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { onSubmit, email, password, onRegister, username } = this.props;
    const { login, register } = this.state;

    if (login) {
      onSubmit(agent.Auth.login(email, password));
    } else {
      onRegister(agent.Auth.register(username, email, password));
    }
  }

  render() {
    const { errors } = this.props;
    const { login, register } = this.state;
    return (
      <div className="container-fluid special-bg">
        <div className="row">
          <div className="col-md-6 col-lg-4 offset-lg-4 offset-md-3 col-12 c-heading">
            <h1 className="mt-3 text-center">AskRi</h1>
            <p className="text-white text-center">Što Riječani misle o tebi?</p>
            <div className="card">
              <div className="card-body">
                {errors && <Errors errors={errors} />}
                <form onSubmit={this.handleSubmit}>
                  {register ? <Input
                    hideLabel
                    type="username"
                    handleChange={this.handleChange}
                    placeholder="Vaše korisničko ime"
                    name="username"
                  /> : null}
                  <Input
                    hideLabel
                    type="email"
                    handleChange={this.handleChange}
                    placeholder="Vaš email"
                    name="email"
                  />
                  <Input
                    hideLabel
                    type="password"
                    handleChange={this.handleChange}
                    placeholder="Vaša lozinka"
                    name="password"
                  />
                  <button type="submit" className="btn btn-primary form-control">{login ? 'Prijava' : 'Registracija'}</button>
                  <small id="emailHelp" onClick={this.handleToggleType} className="form-text text-muted">{login ? 'Nemate račun?' : 'Već ste registrirani?'}</small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.common,
});

const mapDispatchToProps = dispatch => ({
  onChange: (value, key) =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', value, key }),
  onSubmit: payload =>
    dispatch({ type: 'LOGIN', payload }),
  onRegister: payload =>
    dispatch({ type: 'REGISTER', payload }),
  onUnload: () =>
    dispatch({ type: 'UNLOAD_LANDING_PAGE' }),
});

Landing.defaultProps = {
  email: null,
  password: null,
  errors: null,
};

Landing.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.shape({}),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
