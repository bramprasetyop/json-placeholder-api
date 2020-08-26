import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core';
import './styles.scss'

export default class index extends Component {
  render() {
    return (
      <div className="loading">
        <CircularProgress disableShrink />
      </div>
    )
  }
}
