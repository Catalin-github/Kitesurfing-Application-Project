/** @format */

import './Authentication.css';

import * as REGISTER_CONSTANTS from '../../constants/AuthenticationConstants';

import React, { Component } from 'react';
import { loginUserData, registerUser } from '../../redux/authentication/AuthAction';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();

    if (this.checkValidationData()) {
      const registerData = {
        username: this.state.username,
        email: this.state.email,
        avatar: REGISTER_CONSTANTS.AVATAR_USER + this.state.username,
        password: this.state.password,
      };

      await registerUser(registerData).then(res => {
        this.props.loginUserData(res);
      });
    }
  };
  checkValidationData = () => {
    for (const [, value] of Object.entries(this.state.errors)) {
      if (value !== '') return false;
    }
    return true;
  };

  formValidation = e => {
    let input = this.state;
    let errors = {};
    switch (e.target.name) {
      case REGISTER_CONSTANTS.USERNAME:
        if (!input[REGISTER_CONSTANTS.USERNAME]) {
          errors[REGISTER_CONSTANTS.USERNAME] = 'Please enter your username.';
        } else {
          errors[REGISTER_CONSTANTS.USERNAME] = '';
        }
        break;

      case REGISTER_CONSTANTS.EMAIL:
        if (!input[REGISTER_CONSTANTS.EMAIL]) {
          errors[REGISTER_CONSTANTS.EMAIL] = 'Please enter your email address.';
        } else {
          errors[REGISTER_CONSTANTS.EMAIL] = '';
        }

        if (typeof input[REGISTER_CONSTANTS.EMAIL] !== 'undefined') {
          var pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
          );
          if (!pattern.test(input[REGISTER_CONSTANTS.EMAIL])) {
            errors[REGISTER_CONSTANTS.EMAIL] = 'Please enter valid email address.';
          }
        } else {
          errors[REGISTER_CONSTANTS.EMAIL] = '';
        }
        break;

      case REGISTER_CONSTANTS.PASWWORD:
        if (!input[REGISTER_CONSTANTS.PASWWORD]) {
          errors[REGISTER_CONSTANTS.PASWWORD] = 'Please enter your password.';
        } else {
          errors[REGISTER_CONSTANTS.PASWWORD] = '';
        }
        break;
      case REGISTER_CONSTANTS.CONFIRM_PASSWORD:
        if (!input[REGISTER_CONSTANTS.CONFIRM_PASSWORD]) {
          errors[REGISTER_CONSTANTS.CONFIRM_PASSWORD] = 'Please enter your confirm password.';
        } else {
          errors[REGISTER_CONSTANTS.CONFIRM_PASSWORD] = '';
        }

        if (
          typeof input[REGISTER_CONSTANTS.PASWWORD] !== 'undefined' &&
          typeof input[REGISTER_CONSTANTS.CONFIRM_PASSWORD] !== 'undefined'
        ) {
          if (input[REGISTER_CONSTANTS.PASWWORD] !== input[REGISTER_CONSTANTS.CONFIRM_PASSWORD]) {
            errors[REGISTER_CONSTANTS.CONFIRM_PASSWORD] = 'Passwords does not match.';
          } else {
            errors[REGISTER_CONSTANTS.CONFIRM_PASSWORD] = '';
          }
        }
        break;
      default:
        break;
    }

    this.setState({
      errors: Object.assign(this.state.errors, errors),
    });
  };

  render() {
    return (
      <div className="form-wrapper">
        <div className="auth-title">{REGISTER_CONSTANTS.TITLE}</div>
        <form className="form-form" onSubmit={this.handleSubmit}>
          <label htmlFor={REGISTER_CONSTANTS.USERNAME}>{REGISTER_CONSTANTS.USERNAME_TITLE}</label>
          <input
            name={REGISTER_CONSTANTS.USERNAME}
            className="auth-input input"
            value={this.state.username}
            onChange={this.handleChange}
            onBlur={this.formValidation}
            required
          />
          <div className="text-validation">{this.state.errors.username}</div>
          <label htmlFor={REGISTER_CONSTANTS.EMAIL}>{REGISTER_CONSTANTS.EMAIL_TITLE}</label>
          <input
            name={REGISTER_CONSTANTS.EMAIL}
            className="auth-input input"
            onChange={this.handleChange}
            value={this.state.email}
            onBlur={this.formValidation}
            required
          />
          <div className="text-validation">{this.state.errors.email}</div>
          <label htmlFor={REGISTER_CONSTANTS.PASWWORD}>{REGISTER_CONSTANTS.PASWWORD_TITLE}</label>
          <input
            name={REGISTER_CONSTANTS.PASWWORD}
            onChange={this.handleChange}
            className="auth-input input"
            value={this.state.password}
            type="password"
            onBlur={this.formValidation}
            required
          />
          <div className="text-validation">{this.state.errors.password}</div>
          <label htmlFor={REGISTER_CONSTANTS.CONFIRM_PASSWORD}>
            {REGISTER_CONSTANTS.CONFIRM_PASSWORD_TITLE}
          </label>
          <input
            onChange={this.handleChange}
            name={REGISTER_CONSTANTS.CONFIRM_PASSWORD}
            type="password"
            className="auth-input input"
            value={this.state.confirmPassword}
            onBlur={this.formValidation}
            required
          />
          <div className="text-validation">{this.state.errors.confirmPassword}</div>

          <Link className="link-authentication" to="/login">
            {' '}
            {REGISTER_CONSTANTS.SIGN_IN_LINK}
          </Link>
          <input type="submit" value={REGISTER_CONSTANTS.REGISTER} className="button-submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUserData: data => dispatch(loginUserData(data)),
  };
};
export default connect(null, mapDispatchToProps)(Register);
