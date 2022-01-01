import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import {
  Linecircle,
  TickCircle,
  CloseCircle,
  MinusCircle,
} from '../../../../Core/Layout/Icon';
import { BASE_URL } from './../../../../../config';
import axios from 'axios';
import { toggleSignUp } from '../../../../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import {
  enterResume,
} from '../../../../../redux/practice/practice.actions';

const PracticeRecent = ({ match , practiceIdDeepak }) => {
  const [recentChapters, setRecentChapters] = useState([]);
  const [formattedTime, setFormattedTime] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    console.log("new ***")
  })
  useEffect(() => {
    
    (async function getRecentChapters() {
      setIsError(false);
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };

      const body = JSON.stringify({
        practiceSetId: practiceIdDeepak !==null ? practiceIdDeepak : match.params.id,
      });
      try {
        const {
          data: { data },
        } = await axios.post(
          `${BASE_URL}/practiceSet/recentChapters`,
          body,
          config
        );

        let getSeconds = data.map((el) => el.timeSpent);
        let createDuration = getSeconds.map((el) =>
          moment.duration(el, 'seconds')
        );
        let formatDuration = createDuration.map((duration) =>
          duration.format('hh[h] mm[m] ss[s] ')
        );
        setFormattedTime(formatDuration);
        setRecentChapters(data);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
      return function() {
        /**
         * Add cleanup code here
         */
      };
    })();
  }, [practiceIdDeepak]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleResume = (id, practiceSetResultId) => {
    if (localStorage.getItem('token') === '') {
      return dispatch(toggleSignUp(true));
    }
    console.log("practiceSetResultId *****", practiceSetResultId);
    localStorage.setItem('practiceSetResultId', practiceSetResultId);
    dispatch(enterResume(practiceSetResultId));

    return history.push(`/practiceportal/${match.params.id}/${id}`);
  };

  const showStyle = {
    padding: '20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 2px 4px rgb(0 0 0 / 14%)',
    marginBottom: '30px',
    borderRadius: '4px'
  }
   
  

  return (
    localStorage.getItem('token') && 
    <div className="recent-chapter-wrapper">
      <h2 className="status">Recent Chapter</h2>
      
      {recentChapters.length && formattedTime.length
        ? recentChapters.map((item, idx) => (
          <div key={item} className="cp-card">
            <h4 className="cp-card-title">
              {item.chapterName}{' '}
              <span>
                Last attempted:{' '}
                {moment(item.lastAttemptedAt).format('MMMM Do YYYY')}
              </span>
            </h4>
            <ul className="cp-list">
              <li>
                <p className="cp-label">Total Questions</p>
                <span>
                  <Linecircle /> {item.totalQuestion}
                </span>
              </li>
              <li>
                <p className="cp-label">Correct</p>
                <span>
                  <TickCircle /> {item.totalCorrect}
                </span>
              </li>
              <li>
                <p className="cp-label">Incorrect</p>
                <span>
                  <CloseCircle /> {item.totalWrong}
                </span>
              </li>
              <li>
                <p className="cp-label">Skipped</p>
                <span>
                  <MinusCircle /> {item.totalSkipped}
                </span>
              </li>
              <li>
                <p className="cp-label">Time Spent</p>
                <span>{formattedTime[idx]}</span>
              </li>
              <li>
                <p className="cp-label">Language</p>
                <span>{item.language}</span>
              </li>
              <li>
                <button
                  className="btn-primary"
                  onClick={() =>
                    handleResume(item.subjectId, item.practiceSetResultId)
                  }>
                  Resume
                  </button>
              </li>
            </ul>
          </div>
        ))
        : localStorage.getItem('token') === '' ? "" : <h3 style={showStyle}>No Chapter Attempted</h3>}
    </div>
   

  );
}

export default withRouter(PracticeRecent);
