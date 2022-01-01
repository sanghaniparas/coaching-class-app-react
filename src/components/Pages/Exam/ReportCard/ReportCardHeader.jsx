import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ReportCardHeader = ({ testName, history }) => {
  const redirectToCoachingdetails = () => {
    const coachingId = localStorage.getItem('coachingID');
    coachingId ? history.push(`/coaching/${coachingId}`) : history.push(`/`);
    window.location.reload();
  };

  return (
    <Fragment>
      <div className="testReport-header">
        <div className="container">
          <div className="header-left">
            <Link to="/" className="logo">
              <img src={require('../../../../assets/images/logo.svg')} alt="" />
            </Link>
            <h3>{testName}</h3>
          </div>
          {/* <div className="a-detailsBtn">
            <button
              className="btn-grey radius btn-block"
              type="button"
              onClick={() => redirectToCoachingdetails()}>
              Go To Coaching
            </button>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null)(ReportCardHeader);
