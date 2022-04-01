import {
  DELETE_FAVOURITES_SPOT_SUCCESS,
  GET_FAVOURITES_SPOT_SUCCESS,
  GET_SPOTS_FAILURE,
  GET_SPOTS_SUCCESS,
  POST_FAVOURITES_SPOT_SUCCESS,
  POST_SPOT_FAILURE,
  POST_SPOT_SUCCESS,
} from './SpotType';
import { ERROR_ADD_SPOT, SPOT_NOT_FOUND } from '../../constants/SpotConstants';

const initialState = {
  loaded: false,
  loading: true,
  errors: [],
  kiteSpotData: '',
  favouriteSpots: [],
};

const kiteSpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS_SUCCESS:
      const getListErrorIndex = state.errors.indexOf(SPOT_NOT_FOUND);
      return {
        ...state,
        loading: false,
        loaded: true,
        kiteSpotData: action.payload,
        errors:
          getListErrorIndex !== -1
            ? [
                ...state.errors.slice(0, getListErrorIndex),
                ...state.errors.slice(getListErrorIndex + 1),
              ]
            : [],
      };

    case GET_SPOTS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        errors: state.errors.includes(ERROR_ADD_SPOT) ? [...state.errors, SPOT_NOT_FOUND] : [],
      };
    case POST_SPOT_SUCCESS:
      const postErrorIndex = state.errors.indexOf(ERROR_ADD_SPOT);

      return {
        ...state,
        kiteSpotData: [action.payload, ...state.kiteSpotData],
        errors:
          postErrorIndex !== -1
            ? [...state.errors.slice(0, postErrorIndex), ...state.errors.slice(postErrorIndex + 1)]
            : [],
      };

    case POST_SPOT_FAILURE:
      return {
        ...state,
        errors: state.errors.includes(ERROR_ADD_SPOT) && [...state.errors, ERROR_ADD_SPOT],
      };

    case GET_FAVOURITES_SPOT_SUCCESS:
      return {
        ...state,
        favouriteSpots: action.payload,
      };
    case POST_FAVOURITES_SPOT_SUCCESS:
      return {
        ...state,
        favouriteSpots: [...state.favouriteSpots, action.payload],
      };
    case DELETE_FAVOURITES_SPOT_SUCCESS:
      let indexFavouriteSpot;
      state.favouriteSpots.map((val, index) => {
        if (val.id === action.payload.id) {
          indexFavouriteSpot = index;
        }
        return true;
      });
      return {
        ...state,
        favouriteSpots: [
          ...state.favouriteSpots.slice(0, indexFavouriteSpot),
          ...state.favouriteSpots.slice(indexFavouriteSpot + 1),
        ],
      };
    default:
      return state;
  }
};

export default kiteSpotReducer;
