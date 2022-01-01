import {
  USER_SIGNED_SUCCESS,
  USER_SIGNED_FAILURE,
  TOGGLE_SIGN_UP,
  OPEN_OTP_MODAL,
} from '../actions/types';

const initialState = {
  loggedIn: false,
  loading: true,
  popup: false,
  otpModal: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_SIGNED_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
      };
    case TOGGLE_SIGN_UP:
      return {
        ...state,
        popup: payload,
      };
    case OPEN_OTP_MODAL:
      return {
        ...state,
        otpModal: payload,
      };
    case USER_SIGNED_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loading: false,
      };
    default:
      return state;
  }
}
