import './Dashboard.css';

import * as SPOT_CONSTANTS from '../../constants/SpotConstants';

import React, { Component } from 'react';

import SortIcon from './../../assets/sortTableIcon.png';
import StarOn from './../../assets/star-on.png';
import { connect } from 'react-redux';

class SpotTabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      typingTimer: 0,
      doneTypingInterval: 1000,
      sort: true,
    };
  }
  handleKeyUp = e => {
    if (e.key !== 'Enter') {
      clearTimeout(this.state.typingTimer);
      this.setState({
        typingTimer: setTimeout(this.doneTyiping, this.state.doneTypingInterval),
      });
    }
  };
  doneTyiping = () => {
    if (document.getElementById('searchTerm') != null) {
      this.setState({
        searchTerm: document.getElementById('searchTerm').value,
      });
    }
  };
  doneTyipingEnter = e => {
    if (e.key === 'Enter') {
      if (document.getElementById('searchTerm') != null) {
        this.setState({
          searchTerm: document.getElementById('searchTerm').value,
        });
      }
    }
  };
  checkFavouriteSpots = id => {
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
  sortTableByColumnName = e => {
    const tagElement = e.target.parentElement.firstElementChild;
    if (tagElement.tagName === 'IMG') {
      this.props.spotData.sort((a, b) => {
        return !parseFloat(a[tagElement.id])
          ? a[tagElement.id] > b[tagElement.id]
            ? 1
            : -1
          : parseFloat(a[tagElement.id]) > parseFloat(b[tagElement.id])
          ? 1
          : -1;
      });
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div className="table-spot">
        <div className="table-header">
          <div className="table-title">Locations</div>

          <input
            id="searchTerm"
            type="text"
            className="main-input"
            placeholder="Search..."
            onKeyUp={e => this.handleKeyUp(e)}
            onKeyDown={e => (e.key !== 'Enter' ? clearTimeout(this.state.typingTimer) : '')}
            name="searchTerm"
            onKeyPress={e => this.doneTyipingEnter(e)}
            autoComplete="off"
          />
        </div>
        <table className="content-table-spot">
          <thead>
            <tr onClick={this.sortTableByColumnName}>
              <th className="cell-header-spot name-header-width">
                <div>
                  {SPOT_CONSTANTS.SPOT_NAME}
                  <img alt="Loagin..." id="name" className="icon-sort" src={SortIcon} />
                </div>
              </th>
              <th className="cell-header-spot country-header-width">
                <div>
                  {SPOT_CONSTANTS.SPOT_COUNTRY}
                  <img alt="Loagin..." id="country" className="icon-sort" src={SortIcon} />
                </div>
              </th>
              <th className="cell-header-spot  lat-header-width">
                <div>
                  {SPOT_CONSTANTS.SPOT_LATITUDE}
                  <img alt="Loagin..." id="lat" className="icon-sort" src={SortIcon} />
                </div>
              </th>
              <th className="cell-header-spot long-header-width">
                <div>
                  {SPOT_CONSTANTS.SPOT_LONGITUDE}
                  <img alt="Loagin..." id="long" className="icon-sort" src={SortIcon} />
                </div>
              </th>
              <th className="cell-header-spot wind-header-width">
                <div>
                  {SPOT_CONSTANTS.SPOT_WIND_PROBABILITY}
                  <img alt="Loagin..." id="probability" className="icon-sort" src={SortIcon} />
                </div>
              </th>
              <th className="cell-header-spot month-header-width">
                <div>
                  {SPOT_CONSTANTS.SPORT_MONTH}
                  <img alt="Loagin..." id="month" className="icon-sort" src={SortIcon} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.spotData
              .filter(spots =>
                spots.name.toLowerCase().startsWith(this.state.searchTerm.toLowerCase()),
              )
              .map(({ country, id, lat, long, month, name, probability }) => (
                <tr className="active-row" key={id}>
                  <td className="table-row-cell-spot">
                    {name}
                    {this.checkFavouriteSpots(id) ? null : (
                      <img alt="Loagin..." className="mark-favourites-spot" src={StarOn} />
                    )}
                  </td>
                  <td className="table-row-cell-spot">{country}</td>
                  <td className="table-row-cell-spot"> {lat}</td>
                  <td className="table-row-cell-spot"> {long}</td>
                  <td className="table-row-cell-spot"> {probability}</td>
                  <td className="table-row-cell-spot"> {month}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    spotData: state.kiteSpot.kiteSpotData,
    favouriteSpots: state.kiteSpot.favouriteSpots,
  };
};

export default connect(mapStateToProps)(SpotTabel);
