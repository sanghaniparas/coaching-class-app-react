import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout/Layout';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { Search } from '../../Core/Layout/Icon';
import { useDispatch, connect } from 'react-redux';
import { getPracticeSetData } from './../../../redux/Dashboard/dashboard.actions';
import { selectPracticeSet } from './../../../redux/Dashboard/dashboard.selectors';
import { createStructuredSelector } from 'reselect';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import ChapterData from './PracticeComponents/ChapterData';
import AccuracyData from './PracticeComponents/AccuracyData';
import SpeedData from './PracticeComponents/SpeedData';
import RecentChapters from './PracticeComponents/RecentChapters';
import RecentSubjects from './PracticeComponents/RecentSubjects';
import AdvancedSearchModal from './PracticeComponents/AdvancedSearchModal';

const Practice = ({ practiceSet }) => {
  const [examTypeId, setExamTypeId] = useState(null);
  const [practiceId, setPracticeId] = useState(null);
  const [practiceSetArr, setPracticeSetArr] = useState(null);
  const [secondTimeChange, setSecondTimeChange] = useState(false);

  const [chapterStats, setChapterStats] = useState(null);
  const [recentChapters, setRecentChapters] = useState(null);
  const [subjects, setSubjects] = useState(null);

  const [modalToggle, setModalToggle] = useState(false);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  //   For dispatching action of practiceset
  useEffect(() => {
    dispatch(getPracticeSetData());
  }, []);

  useEffect(() => {
    if (practiceSet !== null && practiceSet.coachingExamTypeData) {
      let exam = practiceSet.coachingExamTypeData.find(
        (el) => el.id === practiceSet.practiceSetData.examTypeId
      );
      let practice = exam.PracticeSets.find(
        (el) => el.id === Number(practiceSet.practice_set_id)
      );

      setExamTypeId(exam.id);
      setPracticeId(practice.id);
    }
  }, [practiceSet]);

  useEffect(() => {
    if (practiceSet !== null && examTypeId !== null) {
      let arr = practiceSet.coachingExamTypeData.find(
        (el) => el?.id === examTypeId
      ).PracticeSets;

      if (secondTimeChange && arr.length > 0) {

        setPracticeId(arr[0].id);
        setFlag(true)

      } else {
        setFlag(false)
      }
      setPracticeSetArr(arr);
      console.log("practiceIds", practiceId);
    }
  }, [examTypeId, practiceSet]);

  useEffect(() => {
    setFlag(true)
    if (practiceId !== null) {
      getStats(practiceId);
      getRecentChapters(practiceId);
      getSubjects(practiceId);


    }
  }, [practiceId]);

  // For fetching stats
  const getStats = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };
      const body = {
        practiceSetId: id,
      };
      const {
        data: { data },
      } = await axios.post(`${BASE_URL}/practiceSet/stats`, body, config);

      setChapterStats(data);
    } catch (error) {
      console.log(error);
    }
  };
  // For getting recent chapters
  const getRecentChapters = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };
      const body = {
        practiceSetId: id,
      };
      const {
        data: { data },
      } = await axios.post(
        `${BASE_URL}/practiceSet/recentChapters`,
        body,
        config
      );

      setRecentChapters(data);
    } catch (error) {
      console.log(error);
    }
  };
  // For getting subjects
  const getSubjects = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };
      const {
        data: {
          data: { allSubject },
        },
      } = await axios.get(
        `${BASE_URL}/practiceSet/details/${id}`,
        null,
        config
      );

      setSubjects(allSubject);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {practiceSet === null ||
        practiceSetArr === null ||
        examTypeId === null ||
        practiceId === null ? (
          <div style={{ minHeight: '100vh' }}>
            <Loader
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              type="Oval"
              color="#FF7249"
              height={40}
              width={40}
              timeout={3000} //3 secs
            />
          </div>
        ) : (
          <>
            <div className="dashboard-card-items">
              <div className="dashboard-card-inner practice">
                <div className="pg-card-wrapper">
                  {<ChapterData practiceStats={chapterStats} />}
                  {<AccuracyData practiceStats={chapterStats} />}
                  {<SpeedData practiceStats={chapterStats} />}
                </div>
              </div>
              <div className="practice-bottom-filter">
                <div className="coaching-info">
                  <p>Coaching Name</p>
                  <h4>
                    {practiceSet.practiceSetCoachingData.coachingName},{'  '}
                    {practiceSet.practiceSetCoachingData.city.city},{' '}
                    {practiceSet.practiceSetCoachingData.state.name}{' '}
                  </h4>
                </div>
                <div className="coaching-filter">
                  <div className="form-group">
                    <label htmlFor="">Exam Type</label>
                    <select
                      name=""
                      id=""
                      value={examTypeId}
                      onChange={(e) => {
                        setSecondTimeChange(true);
                        setExamTypeId(Number(e.target.value));
                      }}>
                      {practiceSet.coachingExamTypeData.map((type) => (
                        <option value={type.id}>{type.examType}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Practice Sets</label>
                    {flag ? <select
                      name=""
                      id=""
                      value={practiceId}
                      onChange={(e) => setPracticeId(Number(e.target.value))}>
                      {practiceSetArr.map((el) => (
                        <option value={el.id}>{el.setName}</option>
                      ))}
                    </select> : <select name="" id="">
                        <option>No Practice set</option>
                      </select>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Advance Search</label>
                    <button
                      className="btn-primary radius"
                      onClick={() => setModalToggle(!modalToggle)}>
                      <Search fill="#fff" /> Change Coaching
                  </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="practice-dasboard-wrapper">
              <div className="recent-chapter-wrapper">
                {recentChapters?.length > 0 && <h2 className="status">Recent Chapter</h2>}
                {recentChapters &&
                  recentChapters.map((item) => <RecentChapters item={item} practiceSetId={practiceId} />)}
              </div>

              {/* SUBJECT */}
              {subjects && <RecentSubjects allSubject={subjects} practiceSetId={practiceId} />}
            </div>
          </>
        )}

      {modalToggle && <AdvancedSearchModal setModalToggle={setModalToggle} />}
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceSet: selectPracticeSet,
});

export default connect(mapStateToProps)(Practice);
