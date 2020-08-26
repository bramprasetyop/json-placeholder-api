import * as types from './types'
import axios from 'axios';

export function showLoadingBar () {
  return dispatch => dispatch({
    type: types.SHOW_LOADING_BAR
  })
}

export function hideLoadingBar () {
  return dispatch => dispatch({
    type: types.HIDE_LOADING_BAR
  })
}

// FETCH URL SECTIONS

export const fetchDataUsers = () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  return (dispatch) => {
    dispatch(showLoadingBar())
    return axios.get(apiUrl)
    .then(({data}) => {
      return data
    })
    .then(data => {
      dispatch({
        type: types.ADD_FETCHED_DATA,
        payload: data
      })
      dispatch(hideLoadingBar())
    })
    .catch((error) => {
      throw (error)
    })
  }
}

export const fetchUserAlbum = (id) => {
  const userAlbumApi = `https://jsonplaceholder.typicode.com/users/${id}/albums`
  return (dispatch) => {
    dispatch(showLoadingBar())
    return axios.get(userAlbumApi)
    .then(({data}) => {
      return data
    })
    .then(data => {
      dispatch({
        type: types.ADD_FETCHED_DATA_ALBUM,
        payload: data
      })
      dispatch(hideLoadingBar())
    })
    .catch((error) => {
      throw (error)
    })
  }
}

export const fetchUserAlbumPhoto = (id) => {
  const userAlbumPhotoApi = `https://jsonplaceholder.typicode.com/albums/${id}/photos`
  return (dispatch) => {
    dispatch(showLoadingBar())
    return axios.get(userAlbumPhotoApi)
    .then(({data}) => {
      return data
    })
    .then(data => {
      dispatch({
        type: types.ADD_FETCHED_DATA_ALBUM_PHOTO,
        payload: data
      })
      dispatch(hideLoadingBar())
    })
    .catch((error) => {
      throw (error)
    })
  }
}

export const fetchUserPosts = (id) => {
  const userPostsApi = `https://jsonplaceholder.typicode.com/users/${id}/posts`
  return (dispatch) => {
    dispatch(showLoadingBar())
    return axios.get(userPostsApi)
    .then(({data}) => {
      return data
    })
    .then(data => {
      dispatch({
        type: types.ADD_FETCHED_DATA_POST,
        payload: data
      })
      dispatch(hideLoadingBar())
    })
    .catch((error) => {
      throw (error)
    })
  }
}

export const fetchUserComments = (id) => {
  const userComments = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  return (dispatch) => {
    dispatch(showLoadingBar())
    return axios.get(userComments)
    .then(({data}) => {
      return data
    })
    .then(data => {
      dispatch({
        type: types.ADD_FETCHED_DATA_POST_COMMENTS,
        payload: data
      })
      dispatch(hideLoadingBar())
    })
    .catch((error) => {
      throw (error)
    })
  }
}