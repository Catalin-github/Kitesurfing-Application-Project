import './Dashboard.css';

import React, { Component } from 'react';
import { getFavoritesSpot, getKiteSpotsList } from '../../redux/kitesurfSpot/SpotAction';

import { LOADING_PAGE } from './../../constants/AuthenticationConstants';
import MapWrapped from './KitesurfMap';
import NavBar from './NavBar';
import SpotTabel from './SpotTabel';
import { connect } from 'react-redux';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getFavoritesSpot();
    this.props.getKiteSpotsList();
  };

  render() {
    if (!this.props.spotLoaded) {
      return (
        <div className="ring">
          {LOADING_PAGE}
          <span className="span-loading"></span>
        </div>
      );
    }
    return (
      <div className="content-dashboard">
        <div className="map-wrapper">
          <NavBar />

          <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `89%` }} />}
            mapElement={<div style={{ height: `100%`, width: `100%` }} />}
          />
        </div>

        <SpotTabel />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    spotLoaded: state.kiteSpot.loaded,
    spotData: state.kiteSpot.kiteSpotData,
    favouriteSpots: state.kiteSpot.favouriteSpots,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getKiteSpotsList: () => dispatch(getKiteSpotsList()),
    getFavoritesSpot: () => dispatch(getFavoritesSpot()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
