import React from 'react';
import { Link } from 'react-router-dom';

const PortalHeader = ({ testInstructions }) => {
  return (
    <div className="temp-header-wrapper">
      <div className="temp-header-left">
        <Link to="" className="logo">
          <img
            style={{ maxWidth: '100%' }}
            src={require('../../../../assets/images/logo.svg')}
            alt="logo"
          />
        </Link>
        <h2 className="temp-title">{testInstructions.testInfo.testName}</h2>
      </div>
      <div className="temp-header-right">
        <span className="temp-profile-name">{localStorage.username}</span>
        <span className="profile-avatar">
          <img
            style={{ maxWidth: '100%' }}
            src={require('../../../../assets/images/no-image-icon-md.png')}
            alt="profile"
          />
        </span>
      </div>
    </div>
  );
};

export default PortalHeader;
