import {
  FETCH_HOME_DATA_SUCCESS,
  FETCH_HOME_DATA_FAILURE,
} from './homepage.types';

//Initial State Object
const initialState = {
  homePageData: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_HOME_DATA_SUCCESS:
      return {
        ...state,
        homePageData: payload,
        loading: false,
      };
    case FETCH_HOME_DATA_FAILURE:
      return {
        ...state,
        homePageData: {},
        loading: false,
      };
    default:
      return state;
  }
}
