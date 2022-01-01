import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ExamPreference,
  FollowingIcon,
  PurchaseHistory,
  MyWishlist,
  User,
  Notification,
  Settings,
  ModalClose,
} from '../../../Core/Layout/Icon';

export default function ProfileSidebar({ handleChangeList, selectList,sidebarToggle }) {
  return (
    <div className="profile-sidebar">
      <span className="close" onClick={sidebarToggle}>
        <ModalClose />
      </span>
      <ul>
        <li
          className={selectList === 1 && 'selectedProfile'}
          onClick={() => handleChangeList(1)}>
          <div>
            <span>
              <User />
            </span>{' '}
            My Profile
          </div>
        </li>
        <li
          className={selectList === 2 && 'selectedProfile'}
          onClick={() => handleChangeList(2)}>
          <div>
            <span>
              <ExamPreference />
            </span>{' '}
            Exam Preference
          </div>
        </li>
        <li
          className={selectList === 3 && 'selectedProfile'}
          onClick={() => handleChangeList(3)}>
          <div>
            <span>
              <FollowingIcon />
            </span>{' '}
            Following
          </div>
        </li>
        <li
          className={selectList === 4 && 'selectedProfile'}
          onClick={() => handleChangeList(4)}>
          <div>
            <span>
              <PurchaseHistory />
            </span>{' '}
            Purchase History
          </div>
        </li>
        <li
          className={selectList === 5 && 'selectedProfile'}
          onClick={() => handleChangeList(5)}>
          <div>
            <span>
              <MyWishlist />
            </span>{' '}
            My Wishlist
          </div>
        </li>
        <li
          className={selectList === 6 && 'selectedProfile'}
          onClick={() => handleChangeList(6)}>
          <div>
            <span>
              <Settings />
            </span>{' '}
            Settings
          </div>
        </li>
      </ul>
    </div>
  );
}
