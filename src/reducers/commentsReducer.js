import { ADD_FETCHED_DATA_POST_COMMENTS } from '../actions/types';

export default function userCommentReducers(state = [], action) {
    switch (action.type) {
    case ADD_FETCHED_DATA_POST_COMMENTS:
      return [ ...action.payload]
    default:
      return state
  }
}