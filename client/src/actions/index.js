import streams from '../apis/streams';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM
} from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};


// RESTful async action creators w/ thunk & axios
export const createStream = (fValues) => async (dispatch) => {
  const response = await streams.post('/streams', fValues);

  dispatch({ type: CREATE_STREAM, payload: response.data });
}

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
}

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data});
}

export const editStream = (id, fValues) => async (dispatch) => {
  const response = await streams.put(`/streams/${id}`, fValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
}

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
}