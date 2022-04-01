import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
} from './AuthTypes';
import { LOGIN_ERROR, REGISTRATION_ERROR } from '../../constants/AuthenticationConstants';

import Cookies from 'js-cookie';

export const registerUser = async data => {
  const response = await fetch(`${process.env.REACT_APP_API_KEY}/user`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
  return await response.json();
};

export const loginUserData = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
        'Access-Control-Allow-Methods': 'POST',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res) {
          Cookies.set('UserId', res.userId, { expires: 7 });
          dispatch(authSuccess(res));
        } else {
          throw new Error(REGISTRATION_ERROR);
        }
      })
      .catch(() => {
        dispatch(authFailure(REGISTRATION_ERROR));
      });
  };
};

export const authenticateUser = userId => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
        'Access-Control-Allow-Methods': 'GET',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res !== 'Not found') {
          Cookies.set('UserId', res.id, { expires: 7, sameSite: 'strict' });
          dispatch(authSuccess(res));
        } else {
          throw new Error(AUTHENTICATION_FAILURE);
        }
      })
      .catch(() => {
        dispatch(authFailure(AUTHENTICATION_FAILURE));
      });
  };
};

export const loginUser = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
        'Access-Control-Allow-Methods': 'GET',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        const userData = res.filter(element => {
          return element.username === data.username && element.password === data.password;
        })[0];
        if (userData !== undefined && Object.entries(userData).length > 0) {
          Cookies.set('UserId', userData.userId, { expires: 7, sameSite: 'strict' });
          dispatch(authSuccess(userData));
        } else {
          throw new Error(LOGIN_ERROR);
        }
      })
      .catch(() => {
        dispatch(authFailure(LOGIN_ERROR));
      });
  };
};

export const logOutUser = () => {
  Cookies.remove('UserId', { path: '/', domain: 'localhost' });
  return dispatch => dispatch(authFailure(AUTHENTICATION_FAILURE));
};

export const authRequest = () => {
  return {
    type: AUTHENTICATION_REQUEST,
  };
};

export const authFailure = error => {
  return {
    type: AUTHENTICATION_FAILURE,
    payload: error,
  };
};

export const authSuccess = data => {
  return {
    type: AUTHENTICATION_SUCCESS,
    payload: data,
  };
};
