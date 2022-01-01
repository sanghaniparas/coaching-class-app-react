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

const initialState = {
  mainProfile: null,
  examPreference: null,
  followings: null,
  staticFollowings: [],
  purchaseHistory: null,
  wishListTest: null,
  wishListPractice: null,
  wishListQuiz: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        mainProfile: payload,
        loading: false,
      };
    case FETCH_EXAM_PREFER_SUCCESS:
      return {
        ...state,
        examPreference: payload,
        loading: false,
      };
    case UPDATE_EXAM_PREFER_SUCCESS:
      const findIdx = state.examPreference.findIndex((el) => el === payload);
      let updatedArr;
      if (findIdx !== -1) {
        updatedArr = state.examPreference.filter((el, idx) => idx !== findIdx);
      }

      if (findIdx === -1) {
        updatedArr = [...state.examPreference, payload];
      }

      return {
        ...state,
        examPreference: updatedArr,
      };

    case FETCH_FOLLOWING_SUCCESS:
      return {
        ...state,
        followings: payload,
        staticFollowings: payload,
      };

    case UPDATE_FOLLOWING_LIST:
      let updatedCoachings = state.followings.coachings.filter(
        (el) => el.id !== payload
      );

      return {
        ...state,
        followings: {
          count: state.followings.count - 1,
          coachings: updatedCoachings,
        },
        staticFollowings: {
          count: state.followings.count - 1,
          coachings: updatedCoachings,
        },
      };
    case FILTER_FOLLOWINGS:
      let updatedList = state.staticFollowings.coachings.filter((el) =>
        el.examTypes.filter((el) => el.id === payload).length > 0 ? true : false
      );

      return {
        ...state,
        followings: { count: updatedList.length, coachings: updatedList },
      };

    case WISHLIST_PACKAGES_SUCCESS:
      return {
        ...state,
        wishListTest: payload,
      };

    case UPDATE_WISHLIST_PACKAGE:
      let updateData1 = state.wishListTest.data.filter(
        (el) => el.id !== payload
      );

      return {
        ...state,
        wishListTest: {
          count: state.wishListTest.count - 1,
          data: updateData1,
        },
      };
    case WISHLIST_PRACTICE_SUCCESS:
      return {
        ...state,
        wishListPractice: payload,
      };

    case UPDATE_WISHLIST_PRACTICE:
      let updateData2 = state.wishListPractice.data.filter(
        (el) => el.id !== payload
      );
      return {
        ...state,
        wishListPractice: {
          count: state.wishListPractice.count - 1,
          data: updateData2,
        },
      };
    case WISHLIST_QUIZ_SUCCESS:
      return {
        ...state,
        wishListQuiz: payload,
      };
    case UPDATE_WISHLIST_QUIZ:
      let updateData3 = state.wishListQuiz.data.filter(
        (el) => el.id !== payload
      );
      return {
        ...state,
        wishListQuiz: {
          count: state.wishListQuiz.count - 1,
          data: updateData3,
        },
      };

    case PURCHASE_HISTORY_SUCCESS:
      return {
        ...state,
        purchaseHistory: payload,
      };
    case FETCH_PROFILE_FAILURE:
    case FETCH_EXAM_PREFER_FAILURE:
    case FETCH_FOLLOWING_FAILURE:
    case WISHLIST_PACKAGES_FAILURE:
    case WISHLIST_PRACTICE_FAILURE:
    case WISHLIST_QUIZ_FAILURE:
    case PURCHASE_HISTORY_SUCCESS:
      return {
        ...state,
        mainProfile: null,
        examPreference: null,
        followings: null,
        purchaseHistory: null,
        wishListTest: null,
        wishListPractice: null,
        wishListQuiz: null,
        loading: false,
      };

    default:
      return state;
  }
}
