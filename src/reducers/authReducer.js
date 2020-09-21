import { SIGN_IN, SIGN_OUT } from '../actions/types';

// state to know user's ID and if signed in
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      // if signing in, set userId to payload
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      // if signing out, kill userId
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
}