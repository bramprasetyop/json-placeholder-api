import { combineReducers } from 'redux';
import userReducers from './usersReducer';
import loadingReducers from './loadingReducer'
import userAlbumReducers from './albumReducer'
import userAlbumPhotoReducers from './photoReducer'
import userPostsReducers from './postsReducer'
import userCommentReducers from './commentsReducer'

export default combineReducers({
  userReducers,
  loadingReducers,
  userAlbumReducers,
  userAlbumPhotoReducers,
  userPostsReducers,
  userCommentReducers
})