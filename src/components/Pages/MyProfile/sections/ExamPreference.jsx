import React, { useEffect, useState } from 'react';
import { TickCircle } from '../../../Core/Layout/Icon';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { useDispatch, connect } from 'react-redux';
import { getExamPreferences } from '../../../../redux/MyProfile/profile.actions';
import { BASE_URL } from '../../../../config';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';
import { selectExamPreference } from '../../../../redux/MyProfile/profile.selectors';
import {
  updateExamPreference,
  updateExamPreferenceBackend,
} from '../../../../redux/MyProfile/profile.actions';

const ExamPreference = ({ examPreference }) => {
  const [examList, setExamList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExamPreferences());
  }, []);

  //   For getting exam types and check whether its selected
  useEffect(() => {
    if (examPreference !== null) {
      dispatch(updateExamPreferenceBackend(examPreference));
      (async function fetchExamList() {
        try {
          const {
            data: { data },
          } = await axios.get(`${BASE_URL}/misc/examType`);

          const updatedArr = data.map((item) => {
            if (examPreference.includes(item.id)) {
              return { ...item, selected: true };
            }
            return { ...item, selected: false };
          });

          setExamList(updatedArr);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [examPreference]);

  //   For chooseing exam type
  const handleSelectExamType = (id) => {
    dispatch(updateExamPreference(id));
  };

  return examList.length === 0 ? (
    <div style={{ minHeight: '100vh' }}>
      <Loader
        style={{
          position: 'absolute',
          top: '50%',
          left: '60%',
          transform: 'translate(-50%, -60%)',
        }}
        type="Oval"
        color="#FF7249"
        height={40}
        width={40}
        timeout={3000} //3 secs
      />
    </div>
  ) : (
    <div className="exam-preference">
      <div className="header-filter">
        <div className="left-content">
          <h3>MY Exam Preferences</h3>
          <p>
            You can select multiple options and manage all your exam
            subscription here
          </p>
        </div>
        {/* <div className="filter-group">
            <select name="" id="">
              <option value="">All Exam</option>
            </select>
          </div> */}
      </div>
      <div className="sb-items">
        {examList.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleSelectExamType(item.id)}
            className={`sb-card ${item.selected && 'selected'}`}>
            <img src={item.logoUrl} alt="" />
            <div className="sb-card-content">
              <h4 className="sb-card-title">{item.examType}</h4>
            </div>
            <span className="sb-select">
              {/* <Linecircle /> */}
              {item.selected && <TickCircle />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  examPreference: selectExamPreference,
});

export default connect(mapStateToProps)(ExamPreference);
