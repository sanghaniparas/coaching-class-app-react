import React, { useState, useEffect } from 'react';
import { Linecircle, TickCircle } from '../../../../Core/Layout/Icon';
import { withRouter, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';
import { toggleSignUp } from '../../../../../redux/actions/auth';

const PracticeSubjects = ({ practiceDetails, allSubject, match }) => {

  console.log("all ****", allSubject);
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();

  const [subjectCount, setSubjectCount] = useState(-1);

  const [toggle, setToggle] = useState(false)

  const handleSubjectSelect = (toggle, item, idx) => {

    setToggle(toggle => !toggle);
    console.log(toggle)
    if(toggle === true){
      setSubjectCount(item.stuject.id);
      console.log("preview", item.stuject.subject);
      localStorage.setItem('subjectIndex', item.stuject.subject);
    }else{
      setSubjectCount(-1);
    }
  
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
    history.push(`/practiceportal/${match.params.id}/${subjectCount}`);
  };

  console.log(allSubject);
  return (
    <div className="subject-wrapper">
      <div className="heading-group">
        <div className="text-content">
          <h2 className="status">Subjects</h2>
          <p>
            You can select only one subject at a time to start your practice
          </p>
        </div>
        {Object.keys(allSubject).length > 0 &&
        <div className="content">
          <button className="btn-primary" onClick={handleChooseSubject}>
            Continue
          </button>
        </div>
        }
      </div>

      <div className="card">
        {Object.keys(allSubject).length === 0 ? (
          <div>
            <h4 className="sb-card-title">No Subjects Found</h4>
          </div>
        ) : (
            allSubject.map((item, idx) => (
              item.chapterCount !==0 && 
              <div
                key={idx}
                className="sb-card"
                style={item.chapterCount === 0 ? {pointerEvents: "none", opacity: "0.4"} : { cursor:'pointer'}}
                onClick={() => handleSubjectSelect(!toggle,item, idx)}>
                <img
                  src={require('../../../../../assets/images/academy.png')}
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
            ))
          )}
      </div>
    </div>
  );
};

export default withRouter(PracticeSubjects);
