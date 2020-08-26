import React, { Component } from 'react'
import { Modal, CircularProgress } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import './styles.scss'



class ModalComponent extends Component {

  modalBody() {
    const { photourl } = this.props
    return (
      <div className="modal-component">
        <div className="modal-component-close-button"><CancelIcon fontSize="large" onClick={this.props.handleClose} /></div>
        <div className="modal-component-image">
          { photourl ? <img src={photourl} alt={photourl} /> : <CircularProgress/> }
        </div>
      </div>
    )
  }

  render() {
    const { open, handleClose, photourl } = this.props
    return (
      <Modal
        open={open}
        photourl={photourl}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="modal"
      >
        {
          this.modalBody()
        }
      </Modal>
    )
  }
}

export default ModalComponent
