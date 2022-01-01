import React from 'react';
import {
  TestAppearIcon,
  AccuracyIcons,
  RankIcon,
  ScoreIcon,
} from '../../../Core/Layout/Icon';

const DashboardCard = ({ data, idx }) => {
  console.log(`bs`,data)
  return (
    <div className="dasboard-card">
      <h2>
        <span className="icon">
          {idx === 0 && <TestAppearIcon />}
          {idx === 1 && <ScoreIcon />}
          {idx === 2 && <AccuracyIcons />}
          {idx === 3 && <RankIcon />}
        </span>{' '}
        {idx === 0 && 'Test Appeared'}
        {idx === 1 && 'Score'}
        {idx === 2 && 'Accuracy'}
        {idx === 3 && 'Rank'}
      </h2>
      <p>
        {idx === 0 ? 'Total Tests: ' : 'Overall Best: '}
        {idx === 0 ? data.totalTests ? data.totalTests : 0 : ''}
        {idx === 1 &&
          `${data.overallBest.score !== null ? data.overallBest.score : 0} ${data.overallBest.testName ? `(${data.overallBest.testName})` : ''
          }`}
        {idx === 2 &&
          `${data.overallBest.accuracy ? data.overallBest.accuracy : 0}% ${data.overallBest.testName ? `(${data.overallBest.testName})` : ''
          }`}
        {idx === 3 &&
          `${data.overallBest.rank ? data.overallBest.rank : 0} ${data.overallBest.testName ? `(${data.overallBest.testName})` : ''
          }`}
      </p>
      <p>
        {' '}
        {idx === 0 ? 'Last Month: ' : 'Last Exam: '}
        {idx === 0 &&
          `${data.lastMonthTotalTests ? data.lastMonthTotalTests : 0} `}
        {idx === 1 &&
          `${data.lastExam.score ? data.lastExam.score : 0} ${data.lastExam.testName ? `(${data.lastExam.testName})` : ''
          }`}
        {idx === 2 &&
          `${data.lastExam.accuracy ? data.lastExam.accuracy : 0}% ${data.lastExam.testName ? `(${data.lastExam.testName})` : ''
          }`}
        {idx === 3 &&
          `${data.lastExam.rank ? data.lastExam.rank : 0} ${data.lastExam.testName ? `(${data.lastExam.testName})` : ''
          }`}
      </p>
    </div>
  );
};

export default DashboardCard;
