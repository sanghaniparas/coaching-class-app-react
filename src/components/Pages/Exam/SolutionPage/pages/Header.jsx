import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ solutionData }) => {
  const history = useHistory();
  const redirectToCoachingdetails = () => {
    // const coachingId = localStorage.getItem('coachingID');
    // coachingId ? history.push(`/coaching/${coachingId}`) : history.push(`/`);
    history.push('/dashboard')
    window.location.reload();
  };

  return (
    <header className="solution-header">
      <Link to="">
        <img
          src={require('../../../../../assets/images/logo.svg')}
          className="solution-logo"
          alt="Pinlist logo"
        />
      </Link>
      <h3>
        {solutionData && Object.keys(solutionData).length && solutionData?.testInfo?.testName}
      </h3>
      <div className="solution-header-right">
        <div className="time-left" style={{ display: 'none' }}>
          <span>Total time left </span>
          <span className="count-box">01</span> :
          <span className="count-box">29</span> :
          <span className="count-box">30</span>
        </div>
        {/* <button className="btn-primary radius">Rate This Test</button> */}
        {/* <button
          className="btn-primary radius"
          onClick={() => redirectToCoachingdetails()}>
          Go To Dashboard
        </button> */}


      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    solutionData: state.solution.solutionData,
  };
};

export default connect(mapStateToProps)(Header);
