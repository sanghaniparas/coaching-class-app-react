import React from 'react';
import FeaturedEducators from '../components/FeaturedEducators';
import { Quizz, TestSeries, UnlockLike } from '../../../Core/Layout/Icon';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHomeShortInfo } from '../../../../redux/homepage/homepage.selectors';

const BannerBottom = ({ shortInfo }) => {
  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };
  return (
    <div className="banner-bottom" style={{ cursor: 'pointer' }}>
      <div className="a-container">
        <ul className="count-row">
          <li>
            <h3>
              {' '}
              <UnlockLike />{' '}
              <span>
                {shortInfo !== undefined &&
                  shortInfo.length &&
                  formatCash(shortInfo[0].studentLoveUs)}
              </span>
            </h3>
            <span>Student love us</span>
          </li>
          <li>
            <h3>
              {' '}
              <Quizz />{' '}
              <span>
                {shortInfo !== undefined &&
                  shortInfo.length &&
                  formatCash(shortInfo[0].questionAttempted)}
              </span>
            </h3>
            <span>Questions Attempted</span>
          </li>
          <li>
            <h3>
              {' '}
              <TestSeries />{' '}
              <span>
                {shortInfo !== undefined &&
                  shortInfo.length &&
                  formatCash(shortInfo[0].testAttempted)}
              </span>
            </h3>
            <span>Tests Attempted</span>
          </li>
          <li>
            <h3>
              {' '}
              <UnlockLike />{' '}
              <span>
                {shortInfo !== undefined &&
                  shortInfo.length &&
                  formatCash(shortInfo[0].coachingRegistered)}
              </span>
            </h3>
            <span>Coaching REGISTERED</span>
          </li>
          <li>
            <FeaturedEducators />
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  shortInfo: selectHomeShortInfo,
});

export default connect(mapStateToProps)(BannerBottom);
