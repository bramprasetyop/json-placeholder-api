import React, { Component } from 'react'
import { Modal } from '@material-ui/core';
// import CancelIcon from '@material-ui/icons/Cancel';
import './styles.scss'



class ModalComponent extends Component {
  render() {
    const { open, handleClose, modalbody } = this.props
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="modal"
          modalbody={modalbody}
        >
          {modalbody}
        </Modal>
      </div>
    )
  }
}

export default ModalComponent
