import { BASE_URL, BASE_IMAGE_UPLOAD } from './../../config';
import axios from 'axios';
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_SUCCESS,
  FETCH_EXAM_PREFER_SUCCESS,
  FETCH_EXAM_PREFER_FAILURE,
  UPDATE_EXAM_PREFER_SUCCESS,
  UPDATE_EXAM_PREFER_FAILURE,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAILURE,
  UPDATE_FOLLOWING_LIST,
  FILTER_FOLLOWINGS,
  WISHLIST_PACKAGES_SUCCESS,
  WISHLIST_PACKAGES_FAILURE,
  WISHLIST_PRACTICE_SUCCESS,
  WISHLIST_PRACTICE_FAILURE,
  WISHLIST_QUIZ_SUCCESS,
  WISHLIST_QUIZ_FAILURE,
  UPDATE_WISHLIST_PACKAGE,
  UPDATE_WISHLIST_PRACTICE,
  UPDATE_WISHLIST_QUIZ,
  PURCHASE_HISTORY_SUCCESS,
  PURCHASE_HISTORY_FAILURE,
} from './profile.types';

//For loading Authorization token
const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `${localStorage.token}`,
  },
};

// For fetching main profile data
export const getProfile = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${BASE_URL}/profile/get`, config);

    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_PROFILE_FAILURE,
    });
  }
};

// for getting exam preferences
export const getExamPreferences = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `${BASE_URL}/profile/getExamPreference
		`,
      config
    );

    dispatch({
      type: FETCH_EXAM_PREFER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_EXAM_PREFER_FAILURE,
    });
  }
};

// update exam preference array in redux store
export const updateExamPreference = (id) => (dispatch) => {
  try {
    dispatch({
      type: UPDATE_EXAM_PREFER_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_EXAM_PREFER_FAILURE,
    });
  }
};

// update exam preference to backend
export const updateExamPreferenceBackend = (arr) => async (dispatch) => {
  const body = JSON.stringify({
    examTypeIds: arr,
  });

  try {
    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/profile/updateExamPreference`,
      body,
      config
    );
  } catch (err) {
    console.log(err);
  }
};

// fetching following results
export const getFollowings = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/profile/following`, null, config);

    dispatch({
      type: FETCH_FOLLOWING_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_FOLLOWING_FAILURE,
    });
  }
};

// update following list
export const updateFollowings = (id) => (dispatch) => {
  dispatch({
    type: UPDATE_FOLLOWING_LIST,
    payload: id,
  });
};

// Filtering list of followings
export const filterFollowings = (id) => (dispatch) => {
  dispatch({
    type: FILTER_FOLLOWINGS,
    payload: id,
  });
};

// for fetching test packages which are in wishlist
export const fetchWishListPackages = ({ packageType, examTypeId }) => async (
  dispatch
) => {
  const body = JSON.stringify({
    packageType,
    examTypeId,
  });

  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/profile/wishList`, body, config);

    dispatch({
      type: WISHLIST_PACKAGES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: WISHLIST_PACKAGES_FAILURE,
    });
  }
};
// for fetching practice which are in wishlist
export const fetchWishListPractice = ({ packageType, examTypeId }) => async (
  dispatch
) => {
  const body = JSON.stringify({
    packageType,
    examTypeId,
  });

  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/profile/wishList`, body, config);

    dispatch({
      type: WISHLIST_PRACTICE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: WISHLIST_PRACTICE_FAILURE,
    });
  }
};
// for fetching quiz which are in wishlist
export const fetchWishListQuiz = ({ packageType, examTypeId }) => async (
  dispatch
) => {
  const body = JSON.stringify({
    packageType,
    examTypeId,
  });

  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/profile/wishList`, body, config);

    dispatch({
      type: WISHLIST_QUIZ_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: WISHLIST_QUIZ_FAILURE,
    });
  }
};

// Update wish test list
export const updateWishListPackages = (id) => (dispatch) => {
  dispatch({
    type: UPDATE_WISHLIST_PACKAGE,
    payload: id,
  });
};
// Update wish practice list
export const updateWishListPractice = (id) => (dispatch) => {
  dispatch({
    type: UPDATE_WISHLIST_PRACTICE,
    payload: id,
  });
};
// Update wish test list
export const updateWishListQuiz = (id) => (dispatch) => {
  dispatch({
    type: UPDATE_WISHLIST_QUIZ,
    payload: id,
  });
};

// For uploading profile image to backend
export const uploadProfileImage = ({ student_id, file_name }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  let formData = new FormData();
  formData.append('student_id', student_id);
  formData.append('file_name', file_name);
  try {
    const response = await axios.post(
      `${BASE_IMAGE_UPLOAD}/api/upload-file`,
      formData,
      config
    );

    if (response.data && response.data.status === 100) {
      dispatch(getProfile());
    }
  } catch (err) {
    console.log(err);
  }
};

// update profile in backend
export const updateProfile = ({
  name,
  gender,
  dob,
  address,
  mobile,
  isMobileVerified,
  zipCode,
  cityId,
  stateId,
}) => async (dispatch) => {
  const body = JSON.stringify({
    name,
    gender,
    dob,
    address,
    mobile,
    isMobileVerified,
    zipCode: zipCode && zipCode.toString(),
    cityId: cityId && cityId.toString(),
    stateId: stateId && stateId.toString(),
    countryId: '105',
  });
  try {
    const { data } = await axios.post(
      `${BASE_URL}/profile/update`,
      body,
      config
    );

    console.log(data);

    if (data.code === 200) {
      dispatch(getProfile());
    }
  } catch (err) {
    console.log(err);
  }
};

// For fetching purchase history
export const fetchPurchaseHistory = ({ page, per_page }) => async (
  dispatch
) => {
  const body = JSON.stringify({
    page: page.toString(),
    per_page: per_page.toString(),
  });
  try {
    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/subscription/purchase-history`,
      body,
      config
    );

    dispatch({
      type: PURCHASE_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASE_HISTORY_FAILURE,
    });
  }
};
