import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  fetchQuestions,
  enterResume,
} from '../../../../../redux/practice/practice.actions';
import { createStructuredSelector } from 'reselect';
import { selectPracticeQuestions } from '../../../../../redux/practice/practice.selectors';
import { useToasts } from 'react-toast-notifications';

const EachPracticeChapter = ({
  indx,
  handleToggleReport,
  el,
  resetCount,
  handleChangeChapterId,
  isSelected,
  updatepResultId,
  count,
  chapterId,
  setslideCount,
  practiceQuestions ,
  practiceChaptersAttempted
}) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [attemptedCount, setAttemptedCount] = useState(0);

  useEffect(() => {
    if (practiceQuestions) {
      const arrayQuestion = Object.values(practiceQuestions)
      const count = arrayQuestion.filter((obj) => obj.givenAnswer !== null).length;
      setAttemptedCount(count);
      
     console.log("practiceQuestions",indx)
      
  }
  }, [practiceQuestions]);


  //   For fetching each chapter questions
  const handleQuestions = (id,indx) => {
    resetCount();
    handleChangeChapterId(id);
    handleToggleReport(false);
    dispatch(fetchQuestions(el.practiceSetResultId));
    dispatch(enterResume(id));
    updatepResultId(id)

    localStorage.removeItem('actChapterindex');
    localStorage.removeItem('actChapterid');

    

    localStorage.setItem('actChapterindex', JSON.stringify(indx)); 
    localStorage.setItem('actChapterid', JSON.stringify(id)); 
    setslideCount(0)

  };

 
  return (
    <>
      <li style={{cursor:"pointer"}}>
        <div
          className={isSelected && 'selected-chapter'}
          onClick={() => handleQuestions(el.practiceSetResultId,indx)}>
          <p>{el.chapter}</p>
          <small>
            {practiceChaptersAttempted ? practiceChaptersAttempted : 0}/
             {/* {isSelected ? attemptedCount : 0}/  */}
            {el.practiceSetQuestionTotalCount} Questions 
          </small>
        </div>
      </li>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceQuestions: selectPracticeQuestions,
});

export default connect(mapStateToProps)(EachPracticeChapter);
