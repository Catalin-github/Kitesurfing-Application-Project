import React, { Component } from 'react';

import ReactDom from 'react-dom';

class AddSpotModal extends Component {
  render() {
    if (this.props.openModal === false) {
      if (document.getElementById('add-spot-modal') != null) {
        document.getElementById('add-spot-modal').style.display = 'none';
      }
      return null;
    } else {
      if (document.getElementById('add-spot-modal') != null) {
        document.getElementById('add-spot-modal').style.display = 'block';
      }
    }

    return ReactDom.createPortal(
      <>
        {this.props.children}
        <div></div>
      </>,
      document.getElementById('add-spot-modal'),
    );
  }
}

export default AddSpotModal;
