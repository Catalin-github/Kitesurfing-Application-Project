import { AUTHENTICATION_FAILURE, LOADING_PAGE } from './../../constants/AuthenticationConstants';
import { authFailure, authenticateUser } from '../../redux/authentication/AuthAction';

import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

const PublicRoute = ({ loading, loaded, isAuth, authenticateUser, authFailure, children }) => {
  if (loaded === false) {
    const userId = Cookies.get('UserId');
    if (userId !== undefined && userId !== undefined) {
      authenticateUser(userId);
    } else {
      authFailure(AUTHENTICATION_FAILURE);
    }
  }
  return loading ? (
    <div className="ring">
      {LOADING_PAGE}
      <span className="span-loading"></span>
    </div>
  ) : !isAuth ? (
    children
  ) : (
    <Navigate replace={true} exact to="/dashboard" />
  );
};
const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
    loaded: state.auth.loaded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateUser: userId => dispatch(authenticateUser(userId)),
    authFailure: error => dispatch(authFailure(error)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
