import React, { useState, useEffect } from 'react';
import Layout from '../../../Core/Layout/Layout';
import ExamPreference from './ExamPreference';
import Following from './Following';
import ProfileMain from '././ProfileMain';
import ProfileSidebar from './ProfileSidebar';
import MyWishList from './MyWishList';
import SettingsPage from './SettingsPage';
import PurchaseHistory from './PurchaseHistory';
import { ProfileMenuIcon } from '../../../Core/Layout/Icon';
import { useLocation,useHistory } from 'react-router-dom';
import { selectMainProfile } from './../../../../redux/MyProfile/profile.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const MyProfile = ({ profile }) => {
  const [selectList, setSelectList] = useState(1);
  const [title, setTitle] = useState('My Profile');
  const [profilePercent, setProfilePercent] = useState(0);
  const location = useLocation();
  const history=useHistory()
 

  //   calculating percentage
  useEffect(() => {
    if (profile !== null) {
      const {
        address,
        avatarUrl,
        gender,
        dob,
        userId,
        email,
        mobile,
        name,
      } = profile;
      let arr = [address, avatarUrl, gender, dob, userId, email, mobile, name];

      let percentage = arr.reduce((acc, cur) => {
        if (cur === null) {
          return acc + 0;
        } else {
          return acc + 12.5;
        }
      }, 0);

      setProfilePercent(percentage);
    }
  }, [profile]);

  //   Changing title
  useEffect(() => {

    console.log(`1`,location)
  console.log(`2`,  history)
    if(location.state== "paymentSuccess"){
      handleChangeList(4)
      const state = { ...history.location.state };
      history.replace({ ...history.location, state });
    }

    if (selectList === 1) setTitle('My Profile');
    if (selectList === 2) setTitle('Exam Preference');
    if (selectList === 3) setTitle('Following');
    if (selectList === 4) setTitle('Purchase History');
    if (selectList === 5) setTitle('My Wishlist');
    if (selectList === 6) setTitle('Settings');

    if (Number(localStorage.getItem('myprofileSelect')) === 1) setTitle('My Profile');
    if (Number(localStorage.getItem('myprofileSelect')) === 2) setTitle('Exam Preference');
    if (Number(localStorage.getItem('myprofileSelect')) === 3) setTitle('Following');
    if (Number(localStorage.getItem('myprofileSelect')) === 4) setTitle('Purchase History');
    if (Number(localStorage.getItem('myprofileSelect')) === 5) setTitle('My Wishlist');
    if (Number(localStorage.getItem('myprofileSelect')) === 6) setTitle('Settings');
  }, [selectList]);

  const handleChangeList = (num) => {
    localStorage.setItem('myprofileSelect', Number(num));
    //alert(Number(localStorage.getItem('myprofileSelect')))
    setSelectList(num);

  };

  useEffect(() => {
    console.log('location.state', location.state);
    // console.log("***********", localStorage.getItem('myprofileSelect'));
    if (localStorage.getItem('myprofileSelect')) {
      setSelectList(Number(localStorage.getItem('myprofileSelect')));
    }
    if (location.state && location.state.orderedSuccess) {
      setSelectList(4);
    }
  }, []);
  // Profile sidebar toggle
  const [sidebar, setsidebar] = useState(false);
  const sidebarToggle = () => {
    setsidebar(!sidebar);
  };
  const closeSidebar = () => {
    setsidebar(false);
  };

  return (
    <Layout>
      <div className={`profile-wrapper ${sidebar ? 'open' : ''}`}>
        <div className="a-container">
          <div className="profile-top">
            <h3>
              <span className="profile-menu" onClick={sidebarToggle}>
                <ProfileMenuIcon /> <i>Profile Menu</i>
              </span>
              {title}
            </h3>
            {Number(localStorage.getItem('myprofileSelect')) === 1 &&
            <div className="percent-bar-profile">
              <p>Profile completed {Math.ceil(profilePercent)}%</p>
              <div className="percentbar-profile">
                <span
                  className="fill-inner"
                  style={{ width: `${Math.ceil(profilePercent)}%` }}></span>
              </div>
            </div>
            }
          </div>
          <div className="profile-main">
            <ProfileSidebar
              handleChangeList={handleChangeList}
              selectList={Number(localStorage.getItem('myprofileSelect'))}
              closeSidebar={closeSidebar}
              sidebarToggle={sidebarToggle}
            />
            {Number(localStorage.getItem('myprofileSelect')) === 1 && <ProfileMain />}
            {Number(localStorage.getItem('myprofileSelect')) === 2 && <ExamPreference />}
            {Number(localStorage.getItem('myprofileSelect')) === 3 && <Following />}
            {Number(localStorage.getItem('myprofileSelect')) === 4 && <PurchaseHistory />}
            {Number(localStorage.getItem('myprofileSelect')) === 5 && <MyWishList />}
            {Number(localStorage.getItem('myprofileSelect')) === 6 && <SettingsPage />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: selectMainProfile,
});

export default connect(mapStateToProps)(MyProfile);
