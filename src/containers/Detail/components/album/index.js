import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUserAlbum, fetchUserAlbumPhoto } from '../../../../actions/index';
import { CircularProgress, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ModalComponent from '../../../../components/Modal/index'
import Loading from '../../../../components/Loading/index'
import _ from 'lodash'
import './styles.scss'

const mapStateToProps = (state) =>{
  return{
    albums : state.userAlbumReducers,
    loading: state.loadingReducers.loading,
    photoAlbums: state.userAlbumPhotoReducers
  }
}

class Album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPhotoAlbum: false,
      showModal: false,
      photoUrl: '',
      indexAlbum: 0
    }
  }

  componentDidMount() {
    const { albums } = this.props
    const paramId = this.props.match.params.id
    if (!_.size(albums)) {
      this.props.dispatch(fetchUserAlbum(paramId))
    }
  }

  modalBody() {
    const { photoUrl } = this.state
    return (
      <div className="modal-component">
        <div className="modal-component-close-button"><CancelIcon fontSize="large" onClick={() => this.handleClose()} /></div>
        <div className="modal-component-image">
          { photoUrl ? <img src={photoUrl} alt={photoUrl} /> : <CircularProgress/> }
        </div>
      </div>
    )
  }

  detailAlbum(id) {
    const { showPhotoAlbum } = this.state
    if (!showPhotoAlbum) {
      this.props.dispatch(fetchUserAlbumPhoto(id))
    }
    this.setState({
      showPhotoAlbum: !showPhotoAlbum,
      indexAlbum: id
    })
  }

  seeDetailPhoto(url) {
    this.setState({
      photoUrl: url,
      showModal: true
    })
  }

  handleClose(){
    this.setState({
      showModal: false
    })
  }

  render() {
    const { albums, loading, photoAlbums } = this.props
    const { showModal, showPhotoAlbum, indexAlbum } = this.state
    return (
      <div className="albums">
        {loading && <Loading/>}
        {
          albums.map((album, i) => 
          <div key={i} >
            <Card className="posts-card">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {album.title}
                </Typography>
                {/* <Typography gutterBottom variant="h6" component="h2">
                  {post.body}
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => this.detailAlbum(album.id)}>
                  {showPhotoAlbum && indexAlbum === album.id ? 'Hide Album' : 'Show Album'}
                </Button>
              </CardActions>
            </Card>
            <div className="albums-image">
              {
                photoAlbums ? photoAlbums.map((photo, i) => {
                  return photo.albumId === album.id ? (
                    showPhotoAlbum ? <img key={i} src={photo.thumbnailUrl} alt={photo.thumbnailUrl} onClick={() => this.seeDetailPhoto(photo.url)} /> : null
                  ) : null
                }) : null

              }
            </div>
          </div>
          )
        }
        <ModalComponent
          open={showModal}
          handleClose={() => this.handleClose()}
          modalbody={this.modalBody()}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Album);
