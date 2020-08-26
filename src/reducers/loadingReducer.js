import { SHOW_LOADING_BAR, HIDE_LOADING_BAR } from '../actions/types';

export default function loadingReducers(state = [], action) {
    switch (action.type) {
    case SHOW_LOADING_BAR:
      return {
        ...state,
        loading: true
      }
    case HIDE_LOADING_BAR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}