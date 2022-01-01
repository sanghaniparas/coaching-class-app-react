import React, { useRef, useEffect, useState } from 'react';
import {
  BookMark,
  BookMarkFill,
  Info,
  OptionDots,
} from '../../../../Core/Layout/Icon';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import {
  selectPracticeQuestions,
  selectGivenAnswer,
  selectPracticeChapters
} from '../../../../../redux/practice/practice.selectors';
import QuestionAnswers from './QuestionAnswers';
import {
  storeAnswer,
  updateQuestion,
  saveAnswer,
} from './../../../../../redux/practice/practice.actions';
import ReactHtmlParser from 'react-html-parser';
import { BASE_URL } from './../../../../../config';
import axios from 'axios';
import ReportModal from './ReportModal';
import { Modal } from './../../../../Core/Layout/Modal/Modal';


const SingleQuestion = ({
  singleQuestion,
  practiceQuestions,
  givenAns,
  time,
  singleQuestionIndex,
  pResultId,
  practiceChapters
}) => {
  const [reportToggle, setReportToggle] = useState(false);
  const [reportModalToggle, setReportModalToggle] = useState(false);
  const [reportTypes, setReportTypes] = useState([]);
  const [reportTypeId, setReportTypeId] = useState('');
  const [practiceQuestionsSet, setPracticeQuestionsSet] = useState([]);

  const [practiceQuestionsShow, setPracticeQuestionsShow] = useState([]);

  const dispatch = useDispatch();

  //   Checking that answer already present if not send new answer to backend
  useEffect(() => {
    if (singleQuestion.state !== 'answered') {
      if (givenAns.length > 0) {
        let updatedObj = {
          id: singleQuestion.id,
          givenAnswer: givenAns,
          state: 'answered',
          isCorrect: givenAns === singleQuestion.correctAnswer ? 1 : 0,
        };
        dispatch(updateQuestion(updatedObj));
        sendAnswerToBackend();
        dispatch(storeAnswer(''));
      }
    }
  }, [singleQuestion, givenAns]);

  // Sending answer to backend
  const sendAnswerToBackend = () => {
    let obj = {
      practiceSetResultId:
        pResultId === null
          ? localStorage.getItem('practiceSetResultId')
          : pResultId,
      practiceSetQuestionId: singleQuestion.id,
      state: 'answered',
      givenAnswer: givenAns,
      questionTime: time,
    };

    dispatch(saveAnswer(obj));
  };

  //   For bookmarking a question
  const handleBookmark = async () => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      practiceSetResultId:
        pResultId === null
          ? localStorage.getItem('practiceSetResultId')
          : pResultId,
      practiceSetQuestionId: singleQuestion.id,
    });

    try {
      if (singleQuestion.isBookMarked === 0) {
        let updatedObj = {
          id: singleQuestion.id,
          isBookMarked: 1,
        };
        dispatch(updateQuestion(updatedObj));

        const response = await axios.post(
          `${BASE_URL}/exam/practiceSet/bookmarkQuestion`,
          body,
          config
        );
      }

      if (singleQuestion.isBookMarked === 1) {
        let updatedObj = {
          id: singleQuestion.id,
          isBookMarked: 0,
        };
        dispatch(updateQuestion(updatedObj));

        const response = await axios.post(
          `${BASE_URL}/exam/practiceSet/removeBookmarkQuestion`,
          body,
          config
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [chapterName, setChapterName] = useState('');

  useEffect(() => {
    if (pResultId !== null && practiceChapters !== undefined) {
      let findChapterName = practiceChapters.find(
        (el) => el.practiceSetResultId === parseInt(pResultId)
      )?.chapter;

      setChapterName(findChapterName);

      //console.log("findChapterName ***", findChapterName);
    }
  }, [practiceChapters, pResultId]);

  //   For getting report types
  useEffect(() => {
    if(practiceQuestions){
      const arrObjOne = [...new Map(practiceQuestions.map(item => [JSON.stringify(item), item])).values()];

      //practiceQuestions =  arrObjOne; practiceSetQuestionAttemptedCount

      console.log(practiceChapters)

      setPracticeQuestionsShow(practiceChapters);

    }



    (async function fetchReportTypes() {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/exam/getQuestionReportsTypes`);

        setReportTypes(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  //   For toggling modal
  const reportModalOpen = (e) => {
    setReportTypeId(e.target.id);
    setReportModalToggle(!reportModalToggle);
  };
  const reportModalClose = () => {
    setReportModalToggle(!reportModalToggle);
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setReportToggle(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
   
    <>
      <div className="body-content">
        <div className="header-filter">
          <div className="left-content">
            <p className="left-content-name">{chapterName}</p>
            <h4>
              Question {singleQuestionIndex} of {practiceQuestions?.length || practiceQuestionsShow?.length}
            </h4>
          </div>
          <div className="filter-group">
            {singleQuestion.isBookMarked === 0 ? (
              <span className="act-btn" onClick={handleBookmark}>
                <BookMark />
                Save
              </span>
            ) : (
              <span className="act-btn" onClick={handleBookmark}>
                <BookMarkFill />
                Unsave
              </span>
            )}

            <span
              className="practice-report"
              onClick={() => setReportToggle(!reportToggle)}
              ref={wrapperRef}>
              <Info /> Report
              {reportToggle && (
                <div className="dropdown">
                  <ul>
                    {reportTypes.length &&
                      reportTypes.map((el) => (
                        <li key={el.id} id={el.id} onClick={reportModalOpen}>
                          {el.name}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="question-card-wrapper">
          <div className="qst-card quiz">
            <p>{ReactHtmlParser(singleQuestion?.langs[0]?.question)}</p>
          </div>
          <QuestionAnswers singleQuestion={singleQuestion} practiceChapters={practiceChapters} pResultId={pResultId} />

          {singleQuestion && singleQuestion?.state === 'answered' && (
            <div className="qst-card quiz solution">
              <div className="solution-header">
                <h5>Solution:</h5>
              </div>
              <p>
                {singleQuestion?.solution === null
                  ? 'Sorry, there is no solution!'
                  : ReactHtmlParser(singleQuestion?.solution)}
              </p>
            </div>
          )}
        </div>
      </div>
      {reportModalToggle && (
        <Modal addClass="submitTest modal-sm">
          <ReportModal
            reportTypeId={reportTypeId}
            singleQuestion={singleQuestion}
            reportModalClose={reportModalClose}
          />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceQuestions: selectPracticeQuestions,
  givenAns: selectGivenAnswer,
  practiceChapters: selectPracticeChapters,
});

export default connect(mapStateToProps)(SingleQuestion);
