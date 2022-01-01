import React, { useState, useEffect } from 'react';
import ChapterStats from './../components/ChapterStats';
import AccuracyStats from './../components/AccuracyStats';
import SpeedStats from './../components/SpeedStats';
import { useDispatch } from 'react-redux';
import { getProgressStats } from './../../../../../redux/practice/practice.actions';
import { withRouter } from 'react-router-dom';

const PracticeCurrent = ({ practiceDetails, match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProgressStats(match.params.id));
  }, []);

  return (
    <div className="pg-card-wrapper">
      <h2 className="status">Progress Status</h2>
      {/* {localStorage.getItem('token') === '' && (
        <h1 style={{width: '100%', marginBottom: '20px',background: '#fff', padding: '10px'}}>Please login to see Progress Status</h1>
      )} */}
      <div className="pg-wrap-inner">
        <ChapterStats />
        <AccuracyStats />
        <SpeedStats />
      </div>
    </div>
  );
};

export default withRouter(PracticeCurrent);
