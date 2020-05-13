import { UPDATE_USER_INFO, USER_LOGOUT } from '../actionTypes';

const initialState = {
  accessToken: '',
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      const data = action.payload;
      return { ...state, accessToken: data.accessToken, user: { ...state.user, ...data } };
    case USER_LOGOUT:
      return { accessToken: '', user: {} };
    default:
      return state;
  }
}
