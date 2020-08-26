import React, { Component } from 'react'
import './styles.scss'
import { Grid }  from '@material-ui/core';
import  { Link } from 'react-router-dom';
import ImageMale from '../../assets/image/img_1.jpeg'
import ImageFemale from '../../assets/image/img_2.jpeg'

export default class index extends Component {
  render() {
    return (
      <div className="header">
        <Grid container spacing={2}>
          <Grid item lg={6} md={6}>
            <Link to={{pathname:`/`}}>
              <h1>Meet Our Authors</h1>
            </Link>
            <p>Keep up with your favorite authors’ tour dates and find events in your area. Discover new voices by browsing our bestselling and award-winning authors.</p>
            <hr/>
          </Grid>
          <Grid item lg={2} md={2}>
            <img src={ImageMale} alt=""/>
          </Grid>
          <Grid item lg={2} md={2}>
            <img src={ImageFemale} alt=""/>
          </Grid>
        </Grid>
      </div>
    )
  }
}