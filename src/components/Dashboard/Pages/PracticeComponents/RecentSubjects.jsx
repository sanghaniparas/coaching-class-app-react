import React, { useState } from 'react';
import { toggleSignUp } from '../../../../redux/actions/auth';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TickCircle, Linecircle } from '../../../Core/Layout/Icon';

const RecentSubjects = ({ allSubject, practiceSetId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();

  const [subjectCount, setSubjectCount] = useState(-1);

  const handleSubjectSelect = (item, idx) => {
    setSubjectCount(item.stuject.id);
  };

  //   For selecting subject then giving test
  const handleChooseSubject = () => {
    if (
      localStorage.getItem('token') === '' ||
      localStorage.getItem('token') === null
    ) {
      return dispatch(toggleSignUp(true));
    }

    if (subjectCount === -1) {
      return addToast('Please select a subject for practice!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    localStorage.removeItem("practiceChapters");
    history.push(`/practiceportal/${practiceSetId}/${subjectCount}`);
  };

  
  return (
    <div className="subject-wrapper">
      <div className="heading-group">
        <div className="text-content">
          <h2 className="status">Subjects</h2>
          <p>
            You can select only one subject at a time to start your practice
          </p>
        </div>
        <div className="content">
          <button className="btn-primary" onClick={handleChooseSubject}>
            Continue
          </button>
        </div>
      </div>

      <div className="card">
        {allSubject.map((item, idx) => (
          <div
            key={idx}
            className="sb-card"
            style={{ cursor: 'pointer' }}
            onClick={() => handleSubjectSelect(item, idx)}>
            <img
              src={require('../../../../assets/images/academy.png')}
              alt=""
            />
            <div className="sb-card-content">
              <h4 className="sb-card-title">{item.stuject.subject}</h4>
              <p className="sb-card-subtitle">
                Chapter {item.chapterCount} | {item.questionCount} Questions
              </p>
            </div>
            <span className="sb-select">
              {subjectCount === item.stuject.id ? (
                <TickCircle />
              ) : (
                  <Linecircle />
                )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSubjects;
