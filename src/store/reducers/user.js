import { UPDATE_USER_INFO } from '../actionTypes';

const initialState = {
  accessToken: '',
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      const data = action.payload;
      return { ...state, accessToken: data.accessToken, user: { ...state.user, ...data } };
    default:
      return state;
  }
}
