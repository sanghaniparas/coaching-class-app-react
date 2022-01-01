import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowDown, ModalClose } from '../../Core/Layout/Icon';
import { connect } from 'react-redux';
import { selectMainProfile } from './../../../redux/MyProfile/profile.selectors';
import { createStructuredSelector } from 'reselect';
import { useLocation, useHistory } from 'react-router-dom'


const Sidebar = ({ sidebarClose, mainProfile, profile }) => {
  const location = useLocation();
  const [profilemenu, setprofilemenu] = useState(false);
  const [profilePercent, setProfilePercent] = useState(0);
  const history = useHistory();

  const profilemenuToggle = () => {
    setprofilemenu(!profilemenu);
  };
  const profilemenuClose = () => {
    setprofilemenu(false);
  };

  const updateProfile = () => {
    console.log("commin");
    history.push('/profile')
  }

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
  return (
    <div className={`a-sidebar ${profilemenu ? 'open' : ''}`}>
      <div className="more-info-box">
        <h3 onClick={profilemenuClose}>
          <ArrowDown /> Menu
        </h3>
        <div className="box">
          <h4>Alerts</h4>
          <div className="item">
            <span>Notification</span>
            <span className="badge">2</span>
          </div>
          <div className="item">
            <span>Message</span>
            <span className="badge">2</span>
          </div>
        </div>
        <div className="box">
          <h4>Account</h4>
          <div className="item">
            <span>Some information </span>
          </div>
          <div className="item">
            <span>Another Information</span>
          </div>
        </div>
        <div className="box">
          <h4>Profile</h4>
          <div className="item">
            <span>Logout</span>
          </div>
        </div>
      </div>
      <span className="close" onClick={sidebarClose}>
        <ModalClose />
      </span>
      <div className="a-avatar-info">
        <span className="moremenu" onClick={profilemenuToggle}>
          <ArrowDown />
        </span>
        <span className="avatar">
          {mainProfile !== null && mainProfile.avatarUrl === null && (
            <img
              src={require('../../../assets/images/no-image-icon-md.png')}
              alt="profile pic"
            />
          )}
          {mainProfile !== null && mainProfile.avatarUrl !== null && (
            <img src={`${mainProfile.avatarUrl}`} alt="profile pic" />
          )}
          <img
            className="logo-badge"
            src={require('../../../assets/images/avatar-badge.svg')}
            alt="profile pic"
          />
        </span>
        <div className="avatar-content">
          <h2 className="avatar-name">
            {mainProfile !== null && mainProfile.name}
          </h2>
          <p className="avatar-mail">
            {mainProfile !== null && mainProfile.email}
          </p>
          <div className="profile-complete">
            <span className="progress" style={{ width: `${Math.ceil(profilePercent)}%` }}></span>
          </div>
          <span className="complete-percent">{Math.ceil(profilePercent)}% Completed</span>
          <NavLink to="/profile" className="update" style={{ fontSize: "10px" }}>
            Update Profile
          </NavLink>

        </div>
      </div>
      <div className="a-sidebar-navigation">
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="a-selected">
              <span>
                <img
                  src={require('../../../assets/images/dashboard.svg')}
                  alt="Dashboard"
                />
              </span>
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/test-series-package" activeClassName="a-selected" className={`${location.pathname.includes('/test-series/') ? 'a-selected' : ''}`}>
              <span>
                <img
                  src={require('../../../assets/images/test-series.svg')}
                  alt="Test Series"
                />
              </span>
              <p>Test Series</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/pass-access" activeClassName="a-selected">
              <span>
                <img
                  src={require('../../../assets/images/pass-access.svg')}
                  alt="Pass Access"
                />
              </span>
              <p>Pass Access</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/attempted-test" activeClassName="a-selected">
              <span>
                <img
                  src={require('../../../assets/images/attempted-test.svg')}
                  alt="Attempted Test"
                />
              </span>
              <p>Attempted Test</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/practice-dashboard" activeClassName="a-selected">
              <span>
                <img
                  src={require('../../../assets/images/practice.svg')}
                  alt="Practice"
                />
              </span>
              <p>Practice</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/quizzes" activeClassName="a-selected">
              <span>
                <img
                  src={require('../../../assets/images/quizzes.svg')}
                  alt="Quizzes"
                />
              </span>
              <p>Quizzes</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/save-question" activeClassName="a-selected">
              <span>
                <img
                  src={require('../../../assets/images/save-question.svg')}
                  alt="Saved Question"
                />
              </span>
              <p>Saved Question</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  mainProfile: selectMainProfile,
  profile: selectMainProfile,
});

export default connect(mapStateToProps)(Sidebar);
