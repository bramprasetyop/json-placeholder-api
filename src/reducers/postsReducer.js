import { ADD_FETCHED_DATA_POST } from '../actions/types';

export default function userPostsReducers(state = [], action) {
    switch (action.type) {
    case ADD_FETCHED_DATA_POST:
      return [ ...action.payload]
    default:
      return state
  }
}