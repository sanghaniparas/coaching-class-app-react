import { createSelector } from 'reselect';

// Input selectors
const selectProfileData = (state) => state.profileData;

//For getting profile main data
export const selectMainProfile = createSelector(
  [selectProfileData],
  (profileData) => profileData.mainProfile
);
//For getting profile preference
export const selectExamPreference = createSelector(
  [selectProfileData],
  (profileData) => profileData.examPreference
);
//For getting followings
export const selectFollowings = createSelector(
  [selectProfileData],
  (profileData) => profileData.followings
);

// For wishlist test list
export const selectWishListTest = createSelector(
  [selectProfileData],
  (profileData) => profileData.wishListTest
);

// For wishlist practicelist list
export const selectWishListPractice = createSelector(
  [selectProfileData],
  (profileData) => profileData.wishListPractice
);

// For wishlist quiz list
export const selectWishListQuiz = createSelector(
  [selectProfileData],
  (profileData) => profileData.wishListQuiz
);

// For getting purchase history
export const selectPurchaseHistory = createSelector(
  [selectProfileData],
  (profileData) => profileData.purchaseHistory
);
