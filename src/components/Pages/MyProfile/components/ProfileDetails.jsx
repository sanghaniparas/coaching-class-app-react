import React from 'react';
import moment from 'moment';
import {
  CircleVerifyIcon,
  User,
  DateOfBirth,
  EmailIdIcon,
  GenderIcon,
  UserIdIcon,
  Location,
  PhoneIcon,
} from '../../../Core/Layout/Icon';

const ProfileDetails = ({ profile }) => {
  return (
    <>
      <div className="profile-avt-info">
        <span
          className="avt"
          style={
            profile.avatarUrl === null
              ? {
                  backgroundImage: `url(${require('../../../../assets/images/avatar-1577909_1280.webp')})`,
                }
              : { backgroundImage: `url(${profile.avatarUrl})` }
          }></span>
        <h2>{profile.name}</h2>
        <p>Your account is successfully verified</p>
      </div>
      <div className="profile-details-info">
        <div className="info-box">
          <span className="info-icon">
            <User />
          </span>
          <div className="info">
            <p className="label">Name</p>
            <h3>{profile.name}</h3>
          </div>
        </div>

        <div className="info-box">
          <span className="info-icon">
            <GenderIcon />
          </span>
          <div className="info">
            <p className="label">Gender</p>
            <h3>{profile.gender}</h3>
          </div>
        </div>

        <div className="info-box">
          <span className="info-icon">
            <DateOfBirth />
          </span>
          <div className="info">
            <p className="label">Date of Birth</p>
            <h3>
              {profile.dob !== null &&
                moment(profile.dob).format('MMMM Do YYYY')}
            </h3>
          </div>
        </div>

        <div className="info-box">
          <span className="info-icon">
            <UserIdIcon />
          </span>
          <div className="info">
            <p className="label">User ID</p>
            <h3>{profile.userId}</h3>
          </div>
        </div>

        <div className="info-box">
          <span className="info-icon">
            <EmailIdIcon />
          </span>
          <div className="info">
            <p className="label">Email ID</p>
            <h3>
              {profile.email} <CircleVerifyIcon />{' '}
            </h3>
          </div>
        </div>
        {
          profile.mobile==='' || !profile.mobile || profile.mobile===null?
            null : 
            (
              <div className="info-box">
                <span className="info-icon">
                  <PhoneIcon />
                </span>
                <div className="info">
                  <p className="label">Mobile Number</p>
                  <h3>
                    +91 {profile.mobile} {profile.isMobileVerified===1 && <CircleVerifyIcon />}{' '}
                  </h3>
                </div>
              </div>
            )
        }
        {/* <div className="info-box">
          <span className="info-icon">
            <PhoneIcon />
          </span>
          <div className="info">
            <p className="label">Mobile Number</p>
            <h3>
              +91 {profile.mobile} <CircleVerifyIcon />{' '}
            </h3>
          </div>
        </div> */}
        <div className="info-box">
          <span className="info-icon">
            <Location />
          </span>
          <div className="info">
            <p className="label">Address</p>
            <h3>
              {profile.address}
              {profile.stateId !== null && `, ${profile.state.name}`}{' '}
              {profile.cityId !== null && `, ${profile.city.city}`}{' '}
              {profile.zipCode !== null && `-${profile.zipCode}`}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
