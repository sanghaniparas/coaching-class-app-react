import {
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
  TEST_PACKAGES_SUCCESS,
  TEST_PACKAGES_FAILURE,
  TEST_SERIES_SUCCESS,
  TEST_SERIES_FAILURE,
  PASS_COACHINGS_SUCCESS,
  PASS_COACHINGS_FAILURE,
  PASS_CARDS_SUCCESS,
  PASS_CARDS_FAILURE,
  ATTEMPTED_TEST_SUCCESS,
  ATTEMPTED_TEST_FAILURE,
  PRACTICE_SET_SUCCESS,
  PRACTICE_SET_FAILURE,
  PRACTICE_SET_NAME
} from './dashboard.types';

const initialState = {
  dashboard: null,
  testPackages: null,
  testSeries: null,
  passCoachings: null,
  passCards: null,
  attemptedTest: null,
  practiceSetData: null,
  loading: true,
  packageName: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: payload,
        loading: false,
      };
    case TEST_PACKAGES_SUCCESS:
      return {
        ...state,
        testPackages: payload,
        loading: false,
      };
    case TEST_SERIES_SUCCESS:
      return {
        ...state,
        testSeries: payload,
        packageName: (payload!==null && payload.packageData!==null && Object.keys(payload.packageData).length>0)?payload.packageData.packageName:'',
        loading: false,
      };
    case PASS_COACHINGS_SUCCESS:
      return {
        ...state,
        passCoachings: payload,
        loading: false,
      };
    case PASS_CARDS_SUCCESS:
      return {
        ...state,
        passCards: payload,
        loading: false,
      };
    case ATTEMPTED_TEST_SUCCESS:
      return {
        ...state,
        attemptedTest: payload,
        packageName: (payload!==null && payload.packageData!==null && Object.keys(payload.packageData).length>0)?payload.packageData.packageName:'',
        loading: false,
      };

    case PRACTICE_SET_SUCCESS:
      return {
        ...state,
        practiceSetData: payload,
        loading: false,
      };
    case FETCH_DASHBOARD_FAILURE:
    case TEST_PACKAGES_FAILURE:
    case TEST_SERIES_FAILURE:
    case PASS_COACHINGS_FAILURE:
    case PASS_CARDS_FAILURE:
    case ATTEMPTED_TEST_FAILURE:
    case PRACTICE_SET_FAILURE:
      return {
        ...state,
        dashboard: null,
        testPackages: null,
        testSeries: null,
        passCoachings: null,
        passCards: null,
        attemptedTest: null,
        practiceSetData: null,
        loading: false,
      };

    case PRACTICE_SET_NAME:
      return {
        ...state,
        packageName: payload
      }
    default:
      return state;
  }
}
