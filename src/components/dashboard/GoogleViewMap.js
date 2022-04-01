import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { Component } from 'react';

class GoogleViewMap extends Component {
  render() {
    return (
      <>
        {' '}
        <GoogleMap defaultZoom={1} defaultCenter={{ lat: 46.76938, lng: 23.623 }} />
      </>
    );
  }
}
const ViewMapModal = withScriptjs(withGoogleMap(GoogleViewMap));

export default ViewMapModal;
