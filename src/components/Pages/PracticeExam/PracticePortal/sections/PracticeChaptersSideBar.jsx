import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Search } from '../../../../Core/Layout/Icon';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import {
  selectPracticeChapters,
  selectPracticeQuestions,
  selectResumeState,
} from './../../../../../redux/practice/practice.selectors';
import EachPracticeChapter from './../components/EachPracticeChapter';
import { fetchQuestions } from '../../../../../redux/practice/practice.actions';
import { useHistory } from 'react-router-dom';

const PracticeChaptersSideBar = ({
  practiceChapters,
  practiceQuestions,
  resume,
  resetCount,
  updatepResultId,
  pResultId,
  practicesidebar,
  setpracticesidebar,
  practiceSidebarToggle,
  handleToggleReport,
  count,
  setslideCount
}) => {
  const [searchChapters, setSearchChapters] = useState('');
  const [chapterId, setChapterId] = useState(0);

  const dispatch = useDispatch();
  let history = useHistory();
 
  const fetcherquestion=()=>{
    
    if(localStorage.getItem('actChapterindex')){
     
      let actindex=JSON.parse(localStorage.getItem('actChapterindex')) || 0;
    
      dispatch(fetchQuestions(practiceChapters[actindex].practiceSetResultId));
    }
    else{
      dispatch(fetchQuestions(practiceChapters[0].practiceSetResultId));
      
     
    }

  }

  //  For ftehcing only first chapters questions while mounting
  useEffect(() => {
    // if (resume !== null) {
    //   dispatch(fetchQuestions(resume));
    // }

    if (pResultId !== null) {
      if(localStorage.getItem('actChapterid')){
        setChapterId(JSON.parse(localStorage.getItem('actChapterid')));
      }
      else{
        setChapterId(pResultId);
      }   
      console.log("subodh",pResultId)  
    }

    if (resume === null) {
      if(practiceChapters){
        practiceChapters.length &&
        fetcherquestion()

      if (!practiceChapters.length) {
        return history.goBack();
      }
      }
     
    }else{
      dispatch(fetchQuestions(resume));
    }
    console.log(practiceChapters)
  }, [practiceChapters, resume, pResultId]);

  const handleChange = (e) => {
    setSearchChapters(e.target.value);
  };

  //   During changing chapters
  const handleChangeChapterId = (id) => {
    setChapterId(id);
  };

  const slickRef = useRef();

  function useOuterClick(callback) {
    const callbackRef = useRef(); // initialize mutable callback ref
    const innerRef = useRef(); // returned to client, who sets the "border" element
  
    // update callback on each render, so second useEffect has most recent callback
    useEffect(() => { callbackRef.current = callback; });
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
      function handleClick(e) {
        if (innerRef.current && callbackRef.current && 
          !innerRef.current.contains(e.target)
        ) callbackRef.current(e);
      }
    }, []); // no dependencies -> stable click listener
        
    return innerRef; // convenience for client (doesn't need to init ref himself) 
  }

  const innerRef = useOuterClick(ev => {
    if(practicesidebar === true){
      practiceSidebarToggle()
    }
  });
  



  return (
    <div className={`practice-resume-sidebar ${practicesidebar ? 'open' : ''}`} ref={innerRef}>
      <div className="search-container">
        <div className="search">
          <input
            type="text"
            placeholder="Search Chapter"
            onChange={handleChange}
          />
          <Search />
        </div>
      </div>
      <ul className="chapter-items">
        {searchChapters?.trim().length === 0
          ? practiceChapters?.map((el, id) => (
              <Fragment key={id}>
                <EachPracticeChapter
                  indx={id}
                  el={el}
                  resetCount={resetCount}
                  handleChangeChapterId={handleChangeChapterId}
                  isSelected={chapterId === el.practiceSetResultId}
                  chapterId = {chapterId}
                  updatepResultId={updatepResultId}
                  handleToggleReport={handleToggleReport}
                  count={chapterId === el.practiceSetResultId ? count : 0}
                  practiceQuestions = {practiceQuestions}
                  setslideCount={setslideCount}
                  practiceChaptersAttempted={el.practiceSetQuestionAttemptedCount || 0}
                />
              </Fragment>
            ))
          : practiceChapters
              .filter((el) =>
                el.chapter.toLowerCase().includes(searchChapters.toLowerCase())
              )
              .map((el, id) => (
                <Fragment key={id}>
                  <EachPracticeChapter
                    indx={id}
                    el={el}
                    resetCount={resetCount}
                    updatepResultId={updatepResultId}
                    handleChangeChapterId={handleChangeChapterId}
                    isSelected={chapterId === el.practiceSetResultId}
                    handleToggleReport={handleToggleReport}
                    count={chapterId === el.practiceSetResultId ? count : 0}
                    setslideCount={setslideCount}
                    practiceQuestions = {practiceQuestions}
                  />
                </Fragment>
              ))}
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceChapters: selectPracticeChapters,
  resume: selectResumeState,
  practiceQuestions: selectPracticeQuestions,
});

export default connect(mapStateToProps)(PracticeChaptersSideBar);
