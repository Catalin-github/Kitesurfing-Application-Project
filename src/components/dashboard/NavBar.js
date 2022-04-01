import * as SPOT_CONSTANTS from './../../constants/SpotConstants';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Component } from 'react';

import { TITLE as APPLICATION_TITLE } from '../../constants/AuthenticationConstants';
import AddSpotModal from './AddSpotModal';
import DateFnsUtils from '@date-io/date-fns';
import LogoutIcon from './../../assets/logOutIcon.png';
import ViewMapModal from './GoogleViewMap';
import { addKiteSpot } from '../../redux/kitesurfSpot/SpotAction';
import { connect } from 'react-redux';
import { logOutUser } from '../../redux/authentication/AuthAction';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      openModal: false,
      highSeason: '',
      city: '',
      country: '',
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  pickSeasonDate = e => {
    this.setState({
      highSeason: e.toLocaleString('default', { month: 'long' }),
    });
  };
  toggleSpotModal = () => {
    this.setState({ openModal: !this.state.openModal, city: '', country: '', highSeason: '' });
  };
  addSpotRequest = () => {
    const spotData = {
      name: this.state.city,
      country: this.state.country,
      month: this.state.highSeason,
    };
    this.props.addKiteSpot(spotData);
    this.toggleSpotModal();
  };

  render() {
    return (
      <>
        <div className="navbar-wrapper">
          <div className="navbar-title">{APPLICATION_TITLE}</div>
          <div className="menu-wrapper">
            <div className="add-spot-button" onClick={this.toggleSpotModal}>
              {SPOT_CONSTANTS.ADD_SPOT}
            </div>
            <AddSpotModal openModal={this.state.openModal}>
              <form className="form-add-spot" onSubmit={this.addSpotRequest}>
                <div className="add-spot-modal-title">{SPOT_CONSTANTS.MODAL_ADD_SPOT}</div>
                <label className="form-spot-label">{SPOT_CONSTANTS.SPOT_NAME}</label>
                <input
                  name="city"
                  className="add-spot-input"
                  value={this.state.city}
                  onChange={this.handleChange}
                  required
                />
                <label className="form-spot-label">{SPOT_CONSTANTS.SPOT_COUNTRY}</label>
                <input
                  name="country"
                  className="add-spot-input"
                  value={this.state.country}
                  onChange={this.handleChange}
                  required
                />
                <label className="form-spot-label">{SPOT_CONSTANTS.SPOT_SEASON}</label>
                <div className="date-picker-wrapper">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="MM"
                      value={new Date()}
                      onChange={this.pickSeasonDate}
                    />
                  </MuiPickersUtilsProvider>
                  <div className="date-picker-month">{this.state.highSeason}</div>
                </div>
                <div className="modal-map-wrapper">
                  <ViewMapModal
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className="container-map-modal" />}
                    mapElement={<div className="modal-map-element" />}
                  />
                </div>
                <div className="modal-option">
                  <div className="modal-cancel-button" onClick={this.toggleSpotModal}>
                    {SPOT_CONSTANTS.CANCEL_BUTTON}
                  </div>
                  <button type="submit" className="modal-confirm-button">
                    {SPOT_CONSTANTS.CONFIRM_BUTTON}
                  </button>
                </div>
              </form>
            </AddSpotModal>
            <div
              className="navbar-profile"
              onClick={() => {
                this.setState({ isOpen: !this.state.isOpen });
              }}
            >
              {this.state.isOpen && (
                <div className="profile-menu" onClick={this.props.logOutUser}>
                  {' '}
                  <img alt="Loading..." className="logout-icon" src={LogoutIcon} />
                  <div>{SPOT_CONSTANTS.LOGOUT_BUTTON}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser()),
    addKiteSpot: data => dispatch(addKiteSpot(data)),
  };
};
export default connect(null, mapDispatchToProps)(NavBar);
