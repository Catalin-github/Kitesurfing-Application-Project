/** @format */

import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
} from './AuthTypes';

const initialState = {
  loading: true,
  loaded: false,
  isAuth: false,
  userData: '',
  errors: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        isAuth: false,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        isAuth: true,
        userData: action.payload,
        errors: [],
      };
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        isAuth: false,
        errors: state.errors.includes(action.payload)
          ? state.errors
          : [...state.errors, action.payload],
      };

    default:
      return state;
  }
};

export default authReducer;
