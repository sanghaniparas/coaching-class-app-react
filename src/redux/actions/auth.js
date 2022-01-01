import {
  USER_SIGNED_SUCCESS,
  USER_SIGNED_FAILURE,
  TOGGLE_SIGN_UP,
  OPEN_OTP_MODAL,
} from '../actions/types';

// For checking User loggedIn or not
export const isLoggedIn = () => (dispatch) => {
  if (!localStorage.token) {
    return dispatch({
      type: USER_SIGNED_FAILURE,
    });
  }

  if (localStorage.token) {
    return dispatch({
      type: USER_SIGNED_SUCCESS,
    });
  }
};

// For opening signup popup
export const toggleSignUp = (state) => (dispatch) => {
  dispatch({
    type: TOGGLE_SIGN_UP,
    payload: state,
  });
};

// for opening verification modal
export const openOtpModal = (state) => (dispatch) => {
  dispatch({
    type: OPEN_OTP_MODAL,
    payload: state,
  });
};
