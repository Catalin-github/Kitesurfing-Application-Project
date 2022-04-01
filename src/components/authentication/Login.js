/** @format */

import './Authentication.css';

import * as LOGIN_CONSTANTS from '../../constants/AuthenticationConstants';

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/authentication/AuthAction';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const loginData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(loginData);
  };
  render() {
     return (
       <div className="form-wrapper">
         <div className="auth-title">{LOGIN_CONSTANTS.TITLE}</div>
         <form className="form-form" onSubmit={this.handleSubmit}>
           <div className="text-validation">
             {this.props.errors.includes(LOGIN_CONSTANTS.LOGIN_ERROR)
               ? LOGIN_CONSTANTS.LOGIN_ERROR
               : ''}
           </div>
           <label htmlFor={LOGIN_CONSTANTS.USERNAME}>{LOGIN_CONSTANTS.USERNAME_TITLE}</label>
           <input
             name={LOGIN_CONSTANTS.USERNAME}
             className="auth-input input"
             value={this.state.username}
             onChange={this.handleChange}
             required
           />

           <label htmlFor={LOGIN_CONSTANTS.PASWWORD}>{LOGIN_CONSTANTS.PASWWORD_TITLE}</label>
           <input
             name={LOGIN_CONSTANTS.PASWWORD}
             onChange={this.handleChange}
             className="auth-input input"
             value={this.state.password}
             type="password"
             required
           />

           <Link className="link-authentication" to="/register">
             {LOGIN_CONSTANTS.CREATE_ACCOUNT}
           </Link>

           <input type="submit" value={LOGIN_CONSTANTS.LOGIN} className="button-submit" />
         </form>
       </div>
     );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.auth.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: data => dispatch(loginUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
