import {
  DELETE_FAVOURITES_SPOT_SUCCESS,
  GET_FAVOURITES_SPOT_SUCCESS,
  GET_SPOTS_FAILURE,
  GET_SPOTS_SUCCESS,
  POST_FAVOURITES_SPOT_SUCCESS,
  POST_SPOT_SUCCESS,
} from './SpotType';
import { ERROR_ADD_SPOT, SPOT_NOT_FOUND } from '../../constants/SpotConstants';

export const getKiteSpotsList = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/spot`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (Object.entries(res).length > 0) {
          dispatch(kiteSpotSuccess(res));
        } else {
          throw new Error(SPOT_NOT_FOUND);
        }
      })
      .catch(err => {
        dispatch(kiteSpotFailure(err));
        alert(err);
      });
  };
};
export const addKiteSpot = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/spot`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (Object.entries(res).length > 0) {
          dispatch(addKiteSpotSuccess(res));
        } else {
          throw new Error(ERROR_ADD_SPOT);
        }
      })
      .catch(err => {
        dispatch(kiteSpotFailure(err));
        alert(err);
      });
  };
};

export const getFavoritesSpot = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/favourites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (Object.entries(res).length > 0) {
          dispatch(favouritesSpotSuccess(res));
        } else {
          throw new Error(SPOT_NOT_FOUND);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const addFavoritesSpot = data => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/favourites`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (Object.entries(res).length > 0) {
          dispatch(addFavouritesSpotSuccess(res));
        } else {
          throw new Error(ERROR_ADD_SPOT);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};
export const removeFavouriteSpot = id => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_KEY}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_IP_DOMAIN}`,
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res)
        if (Object.entries(res).length > 0) {
          dispatch(removeFavouritesSpotSuccess(res));
        } else {
          throw new Error(ERROR_ADD_SPOT);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const addKiteSpotSuccess = data => {
  return {
    type: POST_SPOT_SUCCESS,
    payload: data,
  };
};

export const kiteSpotSuccess = data => {
  return {
    type: GET_SPOTS_SUCCESS,
    payload: data,
  };
};
export const kiteSpotFailure = error => {
  return {
    type: GET_SPOTS_FAILURE,
    payload: error,
  };
};
export const favouritesSpotSuccess = data => {
  return {
    type: GET_FAVOURITES_SPOT_SUCCESS,
    payload: data,
  };
};

export const addFavouritesSpotSuccess = data => {
  return {
    type: POST_FAVOURITES_SPOT_SUCCESS,
    payload: data,
  };
};

export const removeFavouritesSpotSuccess = data => {
  return {
    type: DELETE_FAVOURITES_SPOT_SUCCESS,
    payload: data,
  };
};
