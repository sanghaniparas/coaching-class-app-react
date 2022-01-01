import React, { useEffect, useState } from 'react';
import Layout from '../../../../Core/Layout/Layout';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PracticeBreadcrumb from './PracticeBreadcrumb';
import PracticeChaptersSideBar from './PracticeChaptersSideBar';
import PracticeMainBody from './PracticeMainBody';
import { useDispatch } from 'react-redux';
import {
  enterResume,
  getChapters,
} from './../../../../../redux/practice/practice.actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  selectPracticeQuestions,
  selectPracticeChapters,
  selectPracticeLoader,
  selectResumeState,
} from './../../../../../redux/practice/practice.selectors';
import { data } from 'jquery';

const PracticePortal = ({ match, practiceChapters, loading, resumeState,practiceQuestions }) => {
  const [toggleReport, setToggleReport] = useState(false);
  const [count, setCount] = useState(0);
  const [pResultId, setpResultId] = useState(null);
  const [newPercentage, setNewpercentage] = useState(null);
  const [practicesidebar, setpracticesidebar] = useState(false);
  const [slideCount, setslideCount] = useState(0);

  const [allPracticeChapters, setAllPracticeChapters]= useState([]);

  const practiceSidebarToggle = () => {
    setpracticesidebar(!practicesidebar)
  }


    useEffect(() => {
    
      if(localStorage.getItem('countP')){
        setCount(JSON.parse(localStorage.getItem('countP')))
        console.log(`newcounttt`, JSON.parse(localStorage.getItem('countP')))
      }

    }, [toggleReport])

  useEffect(() => {
   
    //localStorage.removeItem('practiceChapters')
    if(localStorage.getItem('practiceChapters')){

      console.log(JSON.parse(localStorage.getItem('practiceChapters')))

      setpResultId(JSON.parse(localStorage.getItem('practiceChapters'))[0].practiceSetResultId);
      setAllPracticeChapters(JSON.parse(localStorage.getItem('practiceChapters')))
     
    }else{
      if (practiceChapters) {
        if (practiceChapters.length > 0) {
          setpResultId(practiceChapters[0].practiceSetResultId);
          localStorage.setItem("practiceChapters", JSON.stringify(practiceChapters));
          setAllPracticeChapters(practiceChapters)
        }
    }

    
  }
  }, [practiceChapters]);

  const updatepResultId = (id) => {
    setpResultId(id);
  };

  useEffect(() => {
    if (resumeState !== null) {
      setpResultId(resumeState);
    }

    // setpResultId(resumeState)
  });

  const dispatch = useDispatch();

  const handleSetToggleReport = () => {
    setToggleReport(!toggleReport);
  };

  const handleToggleReport = () => {
    setToggleReport(false);
  };



  useEffect(() => {
    const data = {
      practiceSetId: match.params.practiceId,
      subjectId: match.params.subjectId,
    };
    dispatch(getChapters(data));
    //localStorage.removeItem('practiceSetResultId');

    return () => {
      dispatch(enterResume(null));
    };
  }, []);


 

  //   Resetting count value
  const resetCount = () => {
    setCount(0);
  };

  return loading === true ? (
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
       
    />
    </div>
  ) : (
    <div className="resume-wrap">
      <Layout>
        <div className="practice-resume-wrapper">
          <PracticeBreadcrumb
            toggleReport={toggleReport}
            handleSetToggleReport={handleSetToggleReport}
            pResultId={pResultId}
            setNewpercentage={setNewpercentage}
            practiceId={match.params.practiceId}
          />
          <div className="practice-resume-body">
            <PracticeChaptersSideBar
              resetCount={resetCount}
              updatepResultId={updatepResultId}
              pResultId={pResultId}
              practicesidebar={practicesidebar}
              setpracticesidebar={setpracticesidebar}
              handleSetToggleReport={handleSetToggleReport}
              handleToggleReport={handleToggleReport}
              count={count}
              setslideCount={setslideCount}
              practiceSidebarToggle={practiceSidebarToggle}
            />
            <PracticeMainBody
              toggleReport={toggleReport}
              handleSetToggleReport={handleSetToggleReport}
              count={count}
              setCount={setCount}
              resetCount={resetCount}
              pResultId={pResultId}
              practiceSidebarToggle={practiceSidebarToggle}
              practicesidebar={practicesidebar}
              newPercentage={newPercentage}
              slideCount={slideCount}
              setslideCount={setslideCount}
              practiceChapters={allPracticeChapters}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceChapters: selectPracticeChapters,
  loading: selectPracticeLoader,
  resumeState: selectResumeState,
  practiceQuestions: selectPracticeQuestions,

});

export default connect(mapStateToProps)(PracticePortal);
