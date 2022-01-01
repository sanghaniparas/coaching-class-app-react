import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toggleSignUp } from '../../../../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import {
  Star,
} from '../../../../Core/Layout/Icon';

const PracticeHeader = (props) => {
  const dispatch = useDispatch();

  console.log("practice details ***", props);

  const [practiceDetails, setPracticeDetails] = useState({
    ...props.practiceDetails,
  });

  useEffect(() => {
    setPracticeDetails(props.practiceDetails);
  }, [props.practiceDetails]);

  return (
    <div className="practice-banner">
      <img
        className="banner-img"
        src={require('../../../../../assets/images/details.jpg')}
        alt=""
      />

      <div className="a-brdcum">
        <div className="a-inner-brdcum">
          <ul>
            <li>
              <span>Home &nbsp;&gt;</span>
            </li>
            {Object.keys(practiceDetails).length === 0 ? null : (
              <li>
                <b>{practiceDetails.examType.examType}</b>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="banner-top">
        {Object.keys(practiceDetails).length === 0 ? null : (
          <img
            className="custom-img"
            src={practiceDetails.examType.logoUrl}
            width="56"
            height="56"
          />
        )}
        
        <div className="banner-content">
          {Object.keys(practiceDetails).length === 0 ? null : (
            <h2>{practiceDetails.setName} </h2>
          )}
          <p>{props.practiceDetails.setDetails}</p>
          
          <div className="banner-bottom">
            <ul>
              {!localStorage.getItem('token') && (
                <li className="banner_btn">
                  <button
                    className="btn-primary radius"
                    onClick={() => dispatch(toggleSignUp(true))}>
                    Sign up For Free Practice
                  </button>
                </li>
              )}
              <li>
                {Object.keys(practiceDetails).length === 0
                  ? null
                  : practiceDetails.subjectCount}
                <span>Subjects</span>{' '}
              </li>
              <li>
                {Object.keys(practiceDetails).length === 0
                  ? null
                  : practiceDetails.chapterCount}{' '}
                <span>Chapters</span>
              </li>
              <li>
                {Object.keys(practiceDetails).length === 0
                  ? null
                  : practiceDetails.questionCount}{' '}
                <span>Questions</span>
              </li>
            </ul>
          </div> 
          <div className="mobile_view banner_rating">
            <p class="a-card-rating">
              <span style={{width: '16px',marginRight: '7px'}}><Star /></span> {Object.keys(practiceDetails).length === 0
                    ? null
                    : practiceDetails?.rating.toFixed(1) > 2
                      ? `${practiceDetails?.rating.toFixed(1)} (${practiceDetails?.ratingCount.toFixed(1)})Ratings`
                      : ` (Not Rated)`}{' '}
            </p> 
            {Object.keys(practiceDetails).length === 0 ? null : (
                 <p class="attempt_by"><strong>Attempted by {practiceDetails?.totalAttempt || 0}</strong></p>
            )}
          </div>        
                  
        </div>
      </div>
    </div>
  );
};

export default PracticeHeader;
