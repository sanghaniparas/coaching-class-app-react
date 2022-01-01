import React, { useEffect } from 'react';
import PracticeWhisList from './../components/PracticeWhisList';
import TestPackageWishList from './../components/TestPackageWishList';
import { useDispatch } from 'react-redux';
import {
  fetchWishListPackages,
  fetchWishListPractice,
  fetchWishListQuiz,
} from '../../../../redux/MyProfile/profile.actions';

const MyWishList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishListPackages({ packageType: '1', examTypeId: '' }));
    dispatch(fetchWishListPractice({ packageType: '2', examTypeId: '' }));
    dispatch(fetchWishListQuiz({ packageType: '3', examTypeId: '' }));
  }, []);

  return (
    <>
      <div className="wishlist-wrapper">
        <TestPackageWishList />
        <PracticeWhisList />
      </div>
    </>
  );
};

export default MyWishList;
