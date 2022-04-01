import * as SPOT_CONSTANTS from './../../constants/SpotConstants';

import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { Component } from 'react';
import { addFavoritesSpot, removeFavouriteSpot } from '../../redux/kitesurfSpot/SpotAction';

import CloseButton from './../../assets/closeButton.png';
import CloseButtonModal from './../../assets/closeButtonModal.png';
import FilterIcon from './../../assets/filterIcon.png';
import KiteSurfingMarker from './../../assets/kiteSurfingMarker.png';
import StarOn from './../../assets/star-on.png';
import { connect } from 'react-redux';
import kiteSurfingMarkerFavourite from './../../assets/kiteSurfingMarkerFavourite.png';

class KitesurfMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotDetails: false,
      openFilter: false,
      country: '',
      wind: '',
    };
  }
  checkFavouriteSpots = () => {
    
    return this.state.spotDetails &&
      this.props.favouriteSpots.filter(value => {
 
        if (value.spot === parseInt(this.state.spotDetails.id)) {
          return true;
        } else {
          return false;
        }
      }).length === 0
      ? true
      : false;
  };
  checkFavouriteSpotsMarker = id => {
    return this.props.favouriteSpots.filter(value => {
      if (value.spot === parseInt(id)) {
        return true;
      } else {
        return false;
      }
    }).length === 0
      ? true
      : false;
  };
  removeSpotFromFavourite = () => {
    const favouriteSpot = this.props.favouriteSpots.filter(val => {
      if (val.spot === parseInt(this.state.spotDetails.id)) {
        return true;
      }
      return false
    })[0];
    this.props.removeFavouriteSpot(favouriteSpot.id);
  };
  markFavouriteSpot = () => {
    const data = { spot: parseInt(this.state.spotDetails.id) };
    this.props.addFavoritesSpot(data);
  };

  filterSpots = e => {
    e.preventDefault();
    this.setState({
      [e.target.children[1].name]: e.target.children[1].value,
      [e.target.children[3].name]: e.target.children[3].value,
    });
  };
  render() {
    return (
      <>
        {!this.state.openFilter ? (
          <div
            className="filter-menu"
            onClick={() => {
              this.setState({ openFilter: !this.state.openFilter });
            }}
          >
            <img alt='Loading...' src={FilterIcon} className="filter-icon-map" />
            <div>{SPOT_CONSTANTS.FILTER_TITLE}</div>
          </div>
        ) : (
          <div className="filter-spot">
            <img alt='Loading...'
              className="close-button"
              src={CloseButton}
              onClick={() => {
                this.setState({ openFilter: !this.state.openFilter });
              }}
            />
            <form className="form-filter" onSubmit={this.filterSpots}>
              <label className="form-label">{SPOT_CONSTANTS.SPOT_COUNTRY}</label>
              <input name="country" className="filter-input" />
              <label className="form-label">{SPOT_CONSTANTS.FILTER_WIND_PROBABILITY}</label>
              <input name="wind" className="filter-input" />
              <input type="submit" className="filter-button" value={SPOT_CONSTANTS.APPLY_FILTER} />
            </form>
          </div>
        )}
        <div id="add-spot-modal" className="create-spot-modal" />

        <GoogleMap defaultZoom={4} defaultCenter={{ lat: 46.76938, lng: 23.623 }}>
          {this.props.spotData
            .filter(spot => {
              return this.state.wind
                ? spot.country.toLowerCase().startsWith(this.state.country.toLowerCase()) &&
                    this.state.wind.slice(0, -1) === spot.probability
                : spot.country.toLowerCase().startsWith(this.state.country.toLowerCase());
            })
            .map(spotData => (
              <Marker
                key={spotData.id}
                position={{
                  lat: parseFloat(spotData.lat),
                  lng: parseFloat(spotData.long),
                }}
                icon={{
                  url: this.checkFavouriteSpotsMarker(spotData.id)
                    ? KiteSurfingMarker
                    : kiteSurfingMarkerFavourite,
                  scaledSize:
                    window.innerHeight < 1080
                      ? new window.google.maps.Size(25, 25)
                      : window.innerHeight < 1450
                      ? new window.google.maps.Size(45, 45)
                      : new window.google.maps.Size(55, 55),
                }}
                onClick={() => {
                  this.setState({ spotDetails: spotData });
                }}
              />
            ))}

          {this.state.spotDetails && (
            <InfoWindow
              position={{
                lat: parseFloat(this.state.spotDetails.lat),
                lng: parseFloat(this.state.spotDetails.long),
              }}
            >
              <>
                {' '}
                <div className="spot-panel">
                  <h4 className="title-spot">
                    {' '}
                    {this.state.spotDetails.name}
                    {this.checkFavouriteSpots() ? null : (
                      <img alt='Loading...' className="mark-favourites-spot" src={StarOn} />
                    )}
                    <img alt='Loading...'
                      className="close-button-modal"
                      src={CloseButtonModal}
                      onClick={() => {
                        this.setState({ spotDetails: null });
                      }}
                    />
                  </h4>
                  <p className="subtitle-spot"> {this.state.spotDetails.country}</p>
                  <p className="title-spot-details"> WIND PROBABILITY</p>
                  <p className="data-spot-details"> {`${this.state.spotDetails.probability}%`}</p>
                  <p className="title-spot-details"> LATITUDE</p>
                  <p className="data-spot-details"> {`${this.state.spotDetails.lat}° N`}</p>
                  <p className="title-spot-details"> LONGITUDE</p>
                  <p className="data-spot-details"> {`${this.state.spotDetails.long}° W`}</p>
                  <p className="title-spot-details"> WHEN TO GO</p>
                  <p className="data-spot-details"> {this.state.spotDetails.month}</p>
                </div>
                {this.checkFavouriteSpots() ? (
                  <div onClick={this.markFavouriteSpot} className="footer-spot">
                    {' '}
                    <div className="spot-plus-icon">+</div> ADD TO FAVOURITES
                  </div>
                ) : (
                  <div onClick={this.removeSpotFromFavourite} className="footer-spot-favourites">
                    {' '}
                    <div className="spot-minus-icon">-</div> REMOVE FROM FAVOURITES
                  </div>
                )}
              </>
            </InfoWindow>
          )}
        </GoogleMap>
      </>
    );
  }
}
const MapWrapped = withScriptjs(withGoogleMap(KitesurfMap));

const mapStateToProps = state => {
  return {
    spotData: state.kiteSpot.kiteSpotData,
    favouriteSpots: state.kiteSpot.favouriteSpots,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFavoritesSpot: data => dispatch(addFavoritesSpot(data)),
    removeFavouriteSpot: id => dispatch(removeFavouriteSpot(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapWrapped);
