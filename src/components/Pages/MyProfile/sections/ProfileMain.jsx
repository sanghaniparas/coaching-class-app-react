import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import {
  getProfile,
  updateProfile,
} from '../../../../redux/MyProfile/profile.actions';
import { selectMainProfile } from '../../../../redux/MyProfile/profile.selectors';
import EditProfile from './../components/EditProfile';
import ProfileDetails from './../components/ProfileDetails';
import { useToasts } from 'react-toast-notifications';

const ProfileMain = ({ profile }) => {
  const [preProfileData, setPreProfileData] = useState(profile);
  const [isMobileVerified, setIsMobileVerified] = useState(0);
  const [edit, setEdit] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(getProfile());
  }, []);
  useEffect(() => {
    setPreProfileData(profile);
  }, [profile]);

  //   For switching main profile & edit profile
  const handleEditClick = async () => {
    if (edit === true) {
      updatedData.isMobileVerified = updatedData.mobile!==preProfileData.mobile?0:isMobileVerified;
      await dispatch(updateProfile(updatedData));
      addToast('Profile updated successfully!', {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
    setEdit(!edit);
  };

  const handleUpdatedData = (data) => {
    setUpdatedData(data);
  };

  const handleIsMobileVerify = (setMobileVerify) => {
    setIsMobileVerified(setMobileVerify);
  }

  return (
    profile && (
      <div className="profile-body">
        <div className="profile-top">
          <button className="btn-white" onClick={handleEditClick}>
            {edit ? 'Update' : 'Edit Profile'}
          </button>
        </div>
        {edit ? (
          <EditProfile
            profile={profile}
            handleUpdatedData={handleUpdatedData}
            handleIsMobileVerify={handleIsMobileVerify}
          />
        ) : (
          <ProfileDetails profile={profile} />
        )}
      </div>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  profile: selectMainProfile,
});

export default connect(mapStateToProps)(ProfileMain);
