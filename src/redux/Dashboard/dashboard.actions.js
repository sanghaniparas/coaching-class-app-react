import { BASE_URL, BASE_IMAGE_UPLOAD } from './../../config';
import axios from 'axios';
import {
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
  TEST_PACKAGES_SUCCESS,
  TEST_PACKAGES_FAILURE,
  TEST_SERIES_SUCCESS,
  TEST_SERIES_FAILURE,
  PASS_COACHINGS_FAILURE,
  PASS_COACHINGS_SUCCESS,
  PASS_CARDS_FAILURE,
  PASS_CARDS_SUCCESS,
  ATTEMPTED_TEST_SUCCESS,
  ATTEMPTED_TEST_FAILURE,
  PRACTICE_SET_SUCCESS,
  PRACTICE_SET_FAILURE,
  PRACTICE_SET_NAME
} from './dashboard.types';

//For loading Authorization token
const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `${localStorage.token}`,
  },
};

// For fetching dashboard data
export const getDashboard = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/dashboard/dashboard`, null, config);

    dispatch({
      type: FETCH_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_DASHBOARD_FAILURE,
    });
  }
};

// Fetching test series packages data for  test series
export const getTestPackages = ({
  search_key,
  package_sort_by,
  exam_type,
}) => async (dispatch) => {
  try {
    const body = {
      search_key,
      package_sort_by,
      exam_type,
    };

    const response = await axios.post(
      `${BASE_URL}/dashboard/dashboard/test_series`,
      body,
      config
    );

    dispatch({
      type: TEST_PACKAGES_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: TEST_PACKAGES_FAILURE,
    });
  }
};

export const fetchTestSeries = ({ testPackageId, testSortBy, testAppeared }) => async (
  dispatch
) => {
  try {
    const body = {
      testPackageId,
      testSortBy,
      testAppeared
    };
    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/dashboard/dashboard/test_series_test_list`,
      body,
      config
    );

    dispatch({
      type: TEST_SERIES_SUCCESS,
      payload: data,
    });
    localStorage.setItem('dashboardTestSeries', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: TEST_SERIES_FAILURE,
    });
  }
};

export const getPassCoachings = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `${BASE_URL}/dashboard/dashboard/pass_access_coaching_list`,
      config
    );

    dispatch({
      type: PASS_COACHINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PASS_COACHINGS_FAILURE,
    });
  }
};

// get coaching pass test cards
export const getPassCards = ({ examTypeId, testPackageId }) => async (
  dispatch
) => {
  try {
    const body = {
      examTypeId,
      testPackageId,
    };

    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/dashboard/dashboard/pass_access_test_list`,
      body,
      config
    );

    dispatch({
      type: PASS_CARDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PASS_CARDS_FAILURE,
    });
  }
};
// get coaching pass test cards
export const getAttemptedTest = ({ testPackageId, coachingId }) => async (
  dispatch
) => {
  try {
    const body = {
      testPackageId,
      coachingId,
    };

    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/dashboard/dashboard/attempted_test_list`,
      body,
      config
    );

    dispatch({
      type: ATTEMPTED_TEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ATTEMPTED_TEST_FAILURE,
    });
  }
};
// for getti8ng coaching and practice sets
export const getPracticeSetData = (practiceSetId = '') => async (dispatch) => {
  try {
    const body = {
      practiceSetId,
    };

    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/dashboard/dashboard/attempted_practice_set_data`,
      body,
      config
    );

    dispatch({
      type: PRACTICE_SET_SUCCESS,
      payload: data,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRACTICE_SET_FAILURE,
    });
  }
};

export const getPackageName = (packageName) => (dispatch) => {
  dispatch({
    type: PRACTICE_SET_NAME,
    payload: packageName,
  });
};
