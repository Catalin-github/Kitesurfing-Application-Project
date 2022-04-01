import authReducer from './authentication/AuthReducer';
import { combineReducers } from 'redux';
import kiteSpotReducer from './kitesurfSpot/SpotReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  kiteSpot: kiteSpotReducer
});
export default rootReducer;
