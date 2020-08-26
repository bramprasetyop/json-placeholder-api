import { ADD_FETCHED_DATA_ALBUM } from '../actions/types';

export default function userAlbumReducers(state = [], action) {
    switch (action.type) {
    case ADD_FETCHED_DATA_ALBUM:
      return [ ...action.payload]
    default:
      return state
  }
}