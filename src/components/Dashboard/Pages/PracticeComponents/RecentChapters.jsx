import React, { useState, useEffect } from 'react';
import {
  Linecircle,
  TickCircle,
  CloseCircle,
  MinusCircle,
} from './../../../Core/Layout/Icon';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { useHistory } from 'react-router-dom';

const RecentChapters = ({ item, practiceSetId }) => {
  console.log("item", practiceSetId, item);
  const history = useHistory()

  const [formattedTime, setFormattedTime] = useState(null);

  useEffect(() => {
    let createDuration = moment.duration(item.timeSpent, 'seconds');
    let formatDuration = createDuration.format('hh[h] mm[m] ss[s] ');
    setFormattedTime(formatDuration);
  }, []);
  return (
    <div key={item} className="cp-card">

      <h4 className="cp-card-title">

        Overview{' '}
        <span>
          Last attempted: {moment(item.lastAttemptedAt).format('lll')}
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
          <span>{formattedTime}</span>
        </li>
        <li>
          <p className="cp-label">Language</p>
          <span>{item.language}</span>
        </li>
        <li>
          <button className="btn-primary" onClick={() => history.push(`/practiceportal/${practiceSetId}/${item.subjectId}`)}>Resume</button>
        </li>
      </ul>
    </div>

  );
};

export default RecentChapters;
