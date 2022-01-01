import React, {useRef, useState, useEffect } from 'react';
import { updateQuestion } from '../../../../../redux/practice/practice.actions';
import {
  BookMark,
  BookMarkFill,
  ModalClose,
  OptionDots,
} from '../../../../Core/Layout/Icon';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import { useDispatch, connect } from 'react-redux';
import { BASE_URL } from './../../../../../config';
import axios from 'axios';
import ReportModal from './ReportModal';
import { createStructuredSelector } from 'reselect';
import {
  selectPracticeChapters,
  selectResumeState,
  selectStaticPracticeQuestions,
} from '../../../../../redux/practice/practice.selectors';
import ReactHtmlParser from 'react-html-parser';

const QuestionModal = ({ practiceQuestions, handleModalClose, pResultId, practiceChapters }) => {
  const [reportToggle, setReportToggle] = useState(false);
  const [optionDropdown, setOptionDropdown] = useState();
  const [reportModalToggle, setReportModalToggle] = useState(false);
  const [reportTypes, setReportTypes] = useState([]);
  const [reportTypeId, setReportTypeId] = useState('');
  const [Qs, setQs] = useState('');
  const [chapterName, setChapterName] = useState('');

  const [hidden, setHidden] = useState({});

  const [practiceQuestionsSet, setPracticeQuestionsSet] = useState([]);

  // const toggleHide = index => {
   
  //   setHidden({ ...hidden, [index]: !hidden[index] });
  //   console.log(hidden);
  // };




  const toggleHide = id => {
    setHidden(prevShown => ({
      ...prevShown,
      [id]: !prevShown[id]
    }));
  };








  const dispatch = useDispatch();

  useEffect(() => {
    if (pResultId !== null && practiceChapters !== undefined) {
      let findChapterName = practiceChapters.find(
        (el) =>
          el.practiceSetResultId === (parseInt(pResultId))
      )?.chapter;

      setChapterName(findChapterName);

    }
  }, [practiceChapters, pResultId]);

  //   For bookmarking a question




  const saveBookmark = async (item,index) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      practiceSetResultId: pResultId ? pResultId : localStorage.getItem('practiceSetResultId'),
      practiceSetQuestionId: item.id,
    });
    try {
        let updatedObj = {
          id: item.id,
          isBookMarked:  1,
        };
        dispatch(updateQuestion(updatedObj));
        
        await axios.post(
          `${BASE_URL}/exam/practiceSet/bookmarkQuestion`,
          body,
          config
        );
      
       console.log('index: ' + index);
       console.log('property name: '+item.isBookMarked);
       let newArr = [...practiceQuestions]; // copying the old datas array
       newArr[index].isBookMarked = 1; // replace e.target.value with whatever you want to change it to
   
       setPracticeQuestionsSet(newArr); // ??
      
    } catch (err) {
      console.log(err);
    }
  }



  const removeBookmark = async (item,index) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      practiceSetResultId: pResultId ? pResultId : localStorage.getItem('practiceSetResultId'),
      practiceSetQuestionId: item.id,
    });
    try {
        let updatedObj = {
          id: item.id,
          isBookMarked: 0,
        };
        dispatch(updateQuestion(updatedObj));
       // setPracticeQuestionsSet(item)
        const response = await axios.post(
          `${BASE_URL}/exam/practiceSet/removeBookmarkQuestion`,
          body,
          config
        );

        console.log('index: ' + index);
       console.log('property name: '+item.isBookMarked);
       let newArr = [...practiceQuestionsSet]; // copying the old datas array
       newArr[index].isBookMarked = 0; // replace e.target.value with whatever you want to change it to
   
       setPracticeQuestionsSet(newArr); // ??

      
     
    } catch (err) {
      console.log(err);
    }
  };

  //   For getting report types
  useEffect(() => {
   // const arrObjOne = [...new Map(practiceQuestions.map(item => [JSON.stringify(item), item])).values()];
    setPracticeQuestionsSet(practiceQuestions);
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
  const reportModalOpen = (e, item) => {
    setQs(item);
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
          setHidden(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, hidden]);
  }
 
 

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  
 

  return (
    <>
      <Modal addClass="chapter-modal">
        <div className="modal-header">
          <p> {localStorage.getItem('subjectIndex')}</p>
          <h3>{chapterName}</h3>
          <span className="close" onClick={() => handleModalClose()} style={{cursor:"pointer"}}>
            <ModalClose />
          </span>
        </div>
        <div className="modal-body">
          {practiceQuestionsSet.length !== 0 &&
            practiceQuestionsSet.map((item, idx) => (
              <div className="chapter-item" key={idx}>
                <div className="question">
                  <span className="qst">Q.{idx + 1}</span>
                  <div style={{marginTop:'-6px'}}>{ReactHtmlParser(item?.langs[0]?.question)}</div>
                </div>
                <div className="action-group" >
                  {item.isBookMarked === 0 ? (
                    <span
                      className="act-btn save" 
                      onClick={() => saveBookmark(item,idx)}>
                      <BookMark />
                      Save
                    </span>
                  ) 
                  : (
                      <span
                        className="act-btn save" style={{display: 'inline-block'}}
                        onClick={() => removeBookmark(item,idx)}>
                        <BookMarkFill />
                      Unsave
                      </span>
                    )}
                  <span className="options">
                    <i
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleHide(item.id)} >
                      <OptionDots />
                    </i>

                    {hidden[item.id] ?  <div className="dropdown" ref={wrapperRef}>
                        <ul>
                          {reportTypes.length &&
                            reportTypes.map((el) => (
                              <li
                              key={el.id}
                                id={el.id}
                                onClick={(e) => reportModalOpen(e, item)}>
                                {el.name}
                              </li>
                            ))}
                        </ul>
                      </div> : null}

                  
                  </span>
                </div>
              </div>
            ))}
        </div>
      </Modal>
      {reportModalToggle && (
        <Modal addClass="submitTest modal-sm">
          <ReportModal
            reportTypeId={reportTypeId}
            singleQuestion={Qs}
            reportModalClose={reportModalClose}
          />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  staticPracticeQuestions: selectStaticPracticeQuestions,
  practiceChapters: selectPracticeChapters,

});
export default connect(mapStateToProps)(QuestionModal);

// export default QuestionModal;
