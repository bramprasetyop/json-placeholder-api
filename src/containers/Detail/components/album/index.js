import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUserAlbum, fetchUserAlbumPhoto } from '../../../../actions/index';
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
      photoUrl: ''
    }
  }

  componentDidMount() {
    const { albums } = this.props
    const paramId = this.props.match.params.id
    if (!_.size(albums)) {
      this.props.dispatch(fetchUserAlbum(paramId))
    }
  }

  detailAlbum(id) {
    const { showPhotoAlbum } = this.state
    if (!showPhotoAlbum) {
      this.props.dispatch(fetchUserAlbumPhoto(id))
    }
    this.setState({
      showPhotoAlbum: !this.state.showPhotoAlbum
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
    const { showModal, photoUrl, showPhotoAlbum } = this.state
    return (
      <div className="albums">
        {loading && <Loading/>}
        <h1>ini albums</h1>
        {
          albums.map((album, i) => 
          <div key={i} >
            <h3 onClick={() => this.detailAlbum(album.id)}> {album.title} </h3>
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
          photourl={photoUrl}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Album);
