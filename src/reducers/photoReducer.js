import { ADD_FETCHED_DATA_ALBUM_PHOTO } from '../actions/types';

export default function userAlbumPhotoReducers(state = [], action) {
    switch (action.type) {
    case ADD_FETCHED_DATA_ALBUM_PHOTO:
      return [ ...action.payload]
    default:
      return state
  }
}