import {
  FETCH_SOLUTION_DATA_SUCCESS,
  FETCH_SOLUTION_DATA_FAILURE,
  FETCHVIRIFYSAVEBUTTONSUCCESS,
  FETCHVIRIFYSAVEBUTTONFAILURE,
  BOOKMARKSOLUTONSUCCESS,
  BOOKMARKSOLUTONFAILURE,
  BOOKMARKSOLUTONSUCCESSEXAM,
  BOOKMARKSOLUTONFAILUREEXAM,
  FETCHVIRIFYSAVEBUTTONSUCCESSEXAM,
  FETCHVIRIFYSAVEBUTTONFAILUREEXAM,
} from './types';
import axios from 'axios';
import { BASE_URL } from './../../config';

// For loading solution data
// @access: Private
const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `${localStorage.token}`,
  },
};

export const fetchSolutionData = (testResultId) => async (dispatch) => {
  const body = {
    testResultId: testResultId.toString(),
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/solution`,
      body
    );

    dispatch({
      type: FETCH_SOLUTION_DATA_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_SOLUTION_DATA_FAILURE,
    });
  }
};

/**
 * Clear test instruction data
 */
export const clearSolutionData = () => (dispatch) => {
  dispatch({
    type: FETCH_SOLUTION_DATA_FAILURE,
  });
};

export const verifySaveButtonVisible = (savedQuestion, page) => async (
  dispatch
) => {
  const body = savedQuestion;
  try {
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/checkBookmarkQuestion`,
      body,
      config
    );

    dispatch({
      type:
        page === 'solution'
          ? FETCHVIRIFYSAVEBUTTONSUCCESS
          : FETCHVIRIFYSAVEBUTTONSUCCESSEXAM,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type:
        page === 'solution'
          ? FETCHVIRIFYSAVEBUTTONFAILURE
          : FETCHVIRIFYSAVEBUTTONFAILUREEXAM,
    });
  }
};

export const BookMarkSolution = (savedQuestion, page) => async (dispatch) => {
  const body = savedQuestion;
  try {
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/bookmarkQuestion`,
      body,
      config
    );

    dispatch({
      type:
        page === 'solution'
          ? BOOKMARKSOLUTONSUCCESS
          : BOOKMARKSOLUTONSUCCESSEXAM,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type:
        page === 'solution'
          ? BOOKMARKSOLUTONFAILURE
          : BOOKMARKSOLUTONFAILUREEXAM,
    });
  }
};
