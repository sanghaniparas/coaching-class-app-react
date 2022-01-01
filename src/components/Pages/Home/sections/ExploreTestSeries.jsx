import React from 'react';
import ExamTypeTabs from './../components/ExamTypeTabs';

const ExploreTestSeries = () => {
  return (
    <div className="explore-section" >
      <div className="a-container">
        <h2>Explore our wide range of Test series</h2>
        <p>
        Experience the real time examination environment with our world-class online test series which includes mock tests, live tests, daily tests and post test analytics.
        </p>
        <div className="explore-tab-section">
          <ExamTypeTabs />
        </div>
      </div>
    </div>
  );
};

export default ExploreTestSeries;
