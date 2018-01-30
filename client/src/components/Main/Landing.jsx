import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import agent from '../../agent';
import { Input, Errors } from '../common';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value, key) {
    const { onChange } = this.props;

    onChange(value, key);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { onSubmit, email, password } = this.props;

    onSubmit(agent.Auth.login(email, password));
  }

  render() {
    const { errors } = this.props;
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
                  <Input
                    hideLabel
                    type="email"
                    handleChange={this.handleChange}
                    placeholder="Vaš Email"
                    name="email"
                  />
                  <Input
                    hideLabel
                    type="password"
                    handleChange={this.handleChange}
                    placeholder="Vaša Lozinka"
                    name="password"
                  />
                  <button type="submit" className="btn btn-primary form-control">Prijava</button>
                  <small id="emailHelp" className="form-text text-muted">Nemate račun?</small>
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
