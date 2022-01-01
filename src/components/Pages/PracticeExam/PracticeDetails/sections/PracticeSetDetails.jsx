import React, { useState, useEffect } from 'react';
import {
  Location,
  Star,
  TestSeries,
  Linecircle,
  TickCircle,
  CloseCircle,
  MinusCircle,
} from '../../../../Core/Layout/Icon';
import { useHistory, withRouter } from 'react-router-dom';
import{useDispatch} from 'react-redux';

import axios from 'axios';
import { getProgressStats } from '../../../../../redux/practice/practice.actions';

const PracticeSetDetails = (props) => {
 const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState({ ...props.onChange });

  const [practiceDetails, setPracticeDetails] = useState({
    ...props.practiceDetails,
  });
  const [allPracticeSet, setAllPracticeSet] = useState({
    ...props.allPracticeSet,
  });

  useEffect(() => {
    console.log(props.practiceDetails)
    setSelectedValue(practiceDetails.id);
    setPracticeDetails(props.practiceDetails);
    setAllPracticeSet(props.allPracticeSet);
  }, [props.practiceDetails, props.allPracticeSet, props.onChange]);

  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="a-card">
          <div className="a-card-header">            
            <div className="a-card-head-content">
              {Object.keys(practiceDetails).length === 0 ? null : (
                // <h3>{practiceDetails.examType.examType}</h3>
                <h3>{practiceDetails?.setName}</h3>
              )}
              {Object.keys(practiceDetails).length === 0 ? null : (
                <p>Attempted by {practiceDetails?.totalAttempt || 0}</p>
              )}
            </div>
          </div>
          <div className="a-card-body">
            <span className="a-card-avatar">
              {Object.keys(practiceDetails).length === 0 ? null : (
                <img
                  src={practiceDetails?.coaching?.logoUrl}
                  width="56"
                  height="56"
                />
              )}
            </span>

            {Object.keys(practiceDetails).length === 0 ? null : (
              <h2 className="a-card-title">
                {practiceDetails?.coaching?.coachingName}
              </h2>
            )}
            {Object.keys(practiceDetails).length === 0 ? null : (
              <p className="a-card-location">
                <Location /> {practiceDetails.coaching.city.city},{' '}
                {practiceDetails?.coaching?.state.name},
                {practiceDetails?.coaching?.country.name}
              </p>
            )}
            <p className="a-card-rating">
              <Star />

              {/* {Object.keys(practiceDetails).length === 0
                ? null
                : (practiceDetails?.rating.toFixed(1) > 2 &&
                  practiceDetails?.ratingCount.toFixed(1)) ||
                ``} */}
              <span>
                {Object.keys(practiceDetails).length === 0
                  ? null
                  : practiceDetails?.rating.toFixed(1) > 2
                    ? `${practiceDetails?.rating.toFixed(1)} (${practiceDetails?.ratingCount.toFixed(1)})Ratings`
                    : ` (Not Rated)`}{' '}
              </span>
            </p>

            <p className="a-card-exam-name">
              {Object.keys(practiceDetails).length === 0
                ? null
                : practiceDetails?.examType?.examType}
            </p>
            <ul className="a-card-lists">
              <li>
                Total Chapter:{' '}
                {Object.keys(practiceDetails).length === 0
                  ? null
                  : practiceDetails?.chapterCount || 0}
              </li>
              <li>
                Total Questions:{' '}
                {Object.keys(practiceDetails).length === 0
                  ? null
                  : practiceDetails?.questionCount || 0}
              </li>

              <li>
                {Object.keys(practiceDetails).length === 0
                  ? null
                  : practiceDetails?.language?.languageName}
              </li>
            </ul>
          </div>
          <div className="a-card-footer">
            <label htmlFor="" className="a-card-select">
              Select your Practice Sets
            </label>
            {/* value={
                        allPracticeSet === null ? '' : allPracticeSet[0].id
                      } */}
            {Object.keys(allPracticeSet).length === 0 ? null : (
              <select
                name=""
                id=""
                defaultValue={props.match.params.id}
                value={allPracticeSet.find(
                  (obj) => obj.value === selectedValue
                )}
                onChange={(e) => {props.onChange(e.target.value)
                  dispatch(getProgressStats(e.target.value));
                }}>
                {allPracticeSet.map((el, idx) => (
                  <option key={idx} value={el.id}>
                    {el.setName}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(PracticeSetDetails);
