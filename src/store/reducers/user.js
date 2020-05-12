import * as TYPES from '../actionTypes';

const initialState = {
  accessToken: '',
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.UPDATE_USER_INFO:
      const { data } = action.payload;
      return { ...state, accessToken: data.accessToken, user: { ...state.user, ...data } };
    default:
      return state;
  }
}
