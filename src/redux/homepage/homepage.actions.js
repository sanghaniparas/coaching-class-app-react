import {
  FETCH_HOME_DATA_FAILURE,
  FETCH_HOME_DATA_SUCCESS,
} from './homepage.types';
import axios from 'axios';
import { BASE_URL } from './../../config';

// For fetching Home Page Data
export const getHomeData = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${BASE_URL}/homePage`);
    dispatch({
      type: FETCH_HOME_DATA_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_HOME_DATA_FAILURE,
    });
  }
};
