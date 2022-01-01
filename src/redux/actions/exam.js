import {
  FETCH_INSTRUCTION_SUCCESS,
  FETCH_INSTRUCTION_FAILURE,
  SHOW_INSTRUCTION,
  SHOW_QUESTION_PAPER,
  LANGUAGE_CHANGE,
  SAVE_ANSWER,
  FETCH_ANSWER_SUCCESS,
  FETCH_ANSWER_FAILURE,
  SAVE_SECTION_NUMBER,
  SECTION_WISE_QUESTION_STATE,
  CURRENT_QUESTION_INDEX,
  SHOW_PORTAL_INSTRUCTION,
  FETCHREPORTFAILURE,
  FETCHREPORTSUCCESS,
  SETREPORTSUCCESS,
  SETREPORTFAILURE,
  FETCH_SECTION_SUMMARY_SUCCESS,
  FETCH_SECTION_SUMMARY_FAILURE,
  FETCH_TEST_SUMMARY_SUCCESS,
  FETCH_TEST_SUMMARY_FAILURE,
  SETLOADING,
  SETREPORTCARDDATA,
  FETCHRECOMENDEDCOACHINGSUCCESS,
  SETTIMERSTATE,
  REPLACE_SECTION_WISE_QUESTION,
} from '../actions/types';
import axios from 'axios';
import { BASE_URL } from './../../config';




// to set pause flag state
// @access: Private
export const setTimerState = (flag, resumeBtnClk) => (dispatch) => {
  dispatch({
    type: SETTIMERSTATE,
    payload: { flag: flag, resumeBtnClk: resumeBtnClk },
  });
};

// For loading instructions
// @access: Private
export const getInstructions = (testId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    testId: testId,
  });

  try {

    dispatch({ type: SETLOADING, payload: true });
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/portalInstruction`,
      body,
      config
    );
    if (!response.data.data) {
      return dispatch({
        type: FETCH_INSTRUCTION_FAILURE,
      });
    }

    dispatch({
      type: FETCH_INSTRUCTION_SUCCESS,
      payload: response.data,
    });
    console.log(response.data);
  } catch (err) {
    dispatch({
      type: FETCH_INSTRUCTION_FAILURE,
    });
  }
};


export const getTestInstructions = (testId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    testId: testId,
  });

  try {

    dispatch({ type: SETLOADING, payload: true });
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/testInstruction`,
      body,
      config
    );
    if (!response.data.data) {
      return dispatch({
        type: FETCH_INSTRUCTION_FAILURE,
      });
    }


    dispatch({
      type: FETCH_INSTRUCTION_SUCCESS,
      payload: response.data,
    });
    console.log(response.data);
  } catch (err) {
    dispatch({
      type: FETCH_INSTRUCTION_FAILURE,
    });
  }
};


export const getExamResult = (testId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    testId: testId,
  });

  try {

    dispatch({ type: SETLOADING, payload: true });
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage`,
      body,
      config
    );
    if (!response.data.data) {
      return dispatch({
        type: FETCH_INSTRUCTION_FAILURE,
      });
    }

    let value = 0;
    if (response.data.data.testInfo.isResumeTest) {
      let sectionWiseQuestion = [];
      response.data.data.sections.map((section, idx) => {
        section.questions.map((question) => {
          value += question.questionTime;
          if (question.state !== 'notVisited') {
            sectionWiseQuestion.push({
              sIndex: idx,
              qIndex: question.id,
              time: question.questionTime.toString(),
              state: question.state,
              answer: question.givenAnswer
                ? [5, 6].includes(question.questionType)
                  ? question.givenAnswer.toUpperCase()
                  : question.givenAnswer
                : '',
            });
          }
        });
      });

      value = (value / 60).toFixed(0);

      dispatch(replaceSectionWiseQuestion(sectionWiseQuestion));
    }

    response.data.data.testConfig.duration =
      response.data.data.testConfig.duration - value;

    dispatch({
      type: FETCH_INSTRUCTION_SUCCESS,
      payload: response.data,
    });
    console.log(response.data);
  } catch (err) {
    dispatch({
      type: FETCH_INSTRUCTION_FAILURE,
    });
  }
};




// For replacing the whole section wise array
export const replaceSectionWiseQuestion = (arr) => (dispatch) => {
  dispatch({
    type: REPLACE_SECTION_WISE_QUESTION,
    payload: arr,
  });
};

/**
 * Clear test instruction data
 */
export const clearTestInstruction = () => (dispatch) => {
  dispatch({
    type: FETCH_INSTRUCTION_FAILURE,
  });
};

export const getRecomendedCoaching = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };

  try {
    const response = await axios.get('${BASE_URL}/coachingPage', config);
    if (!response.data.data) {
      return dispatch({
        type: FETCH_INSTRUCTION_FAILURE,
      });
    }
    dispatch({
      type: FETCHRECOMENDEDCOACHINGSUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_INSTRUCTION_FAILURE,
    });
  }
};

// For loading report options
// @access: Private
export const getReportQuestion = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };
  try {
    const response = await axios.get(
      `${BASE_URL}/exam/getQuestionReportsTypes`,
      config
    );
    if (!response.data.data) {
      return dispatch({
        type: FETCHREPORTFAILURE,
      });
    }
    dispatch({
      type: FETCHREPORTSUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCHREPORTFAILURE,
    });
  }
};

// to show instruction at the beginning of section
// @access: Private
export const toggleInstruction = (show) => (dispatch) => {
  dispatch({
    type: SHOW_INSTRUCTION,
    payload: show,
  });
};

// to toggle question paper
// @access: Private
export const toggleQuestionPaper = (show) => (dispatch) => {
  dispatch({
    type: SHOW_QUESTION_PAPER,
    payload: show,
  });
};

// to toggle question paper
// @access: Private
export const togglePortalInstruction = (show) => (dispatch) => {
  dispatch({
    type: SHOW_PORTAL_INSTRUCTION,
    payload: show,
  });
};

// to change language
// @access: Private
export const changeLanguage = (langId) => (dispatch) => {
  dispatch({
    type: LANGUAGE_CHANGE,
    payload: langId,
  });
};

/**
 * Saving report for question
 */
export const saveReportQuestion = (report) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };
  const body = JSON.stringify(report);
  try {
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/reportQuestion`,
      body,
      config
    );

    console.log(response.data);

    dispatch({
      type: SETREPORTSUCCESS,
      payload: true,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SETREPORTFAILURE,
    });
  }
};

// to save each question answer
// @access: Private
export const saveAnswer = (answer) => (dispatch) => {
  dispatch({
    type: SAVE_ANSWER,
    payload: answer,
  });
};

/**
 * Saving Answer to backend and getting counts
 */
export const saveAns = ({
  testResultId,
  testQuestionId,
  givenAnswer,
  section,
  state,
  languageId,
  questionTime,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    testResultId,
    testQuestionId,
    givenAnswer,
    section,
    state,
    languageId,
    questionTime,
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/saveAnswer`,
      body,
      config
    );

    console.log(response.data.data);

    dispatch({
      type: FETCH_ANSWER_SUCCESS,
      payload: response.data.data.statesCount,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_ANSWER_FAILURE,
    });
  }
};

/**
 * For stateCount when switching section tabs
 * @param {*testResultId, section}
 */
export const switchTabsStateCount = ({ testResultId, section }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    testResultId,
    section,
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/sectionWiseStatesCount`,
      body,
      config
    );

    dispatch({
      type: FETCH_ANSWER_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ANSWER_FAILURE,
    });
  }
};

/**
 * Save section number
 */
export const saveSectionNumber = (val) => (dispatch) => {
  dispatch({
    type: SAVE_SECTION_NUMBER,
    payload: val,
  });
};

/**
 * For maintaining SectionWise Question State
 */
export const sectionWiseQuestionState = (obj) => (dispatch) => {
  dispatch({
    type: SECTION_WISE_QUESTION_STATE,
    payload: obj,
  });
};

/**
 * set current question Index
 */
export const setCurrentQuestionIndex = (idx) => (dispatch) => {
  dispatch({
    type: CURRENT_QUESTION_INDEX,
    payload: idx,
  });
};

/**
 * For getting section summary
 */
export const getSectionSummary = ({ testResultId, section }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    testResultId,
    section,
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/getSectionSummary`,
      body,
      config
    );
    dispatch({
      type: FETCH_SECTION_SUMMARY_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_SECTION_SUMMARY_FAILURE,
    });
  }
};

/**
 * For getting whole test summary
 */
export const getTestSummary = (testResultId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    testResultId,
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/exam/testPackage/getTestSummary`,
      body,
      config
    );

    console.log(response.data.data);

    dispatch({
      type: FETCH_TEST_SUMMARY_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_TEST_SUMMARY_FAILURE,
    });
  }
};

export const setReportCardData = (repoetDate) => (dispatch) => {
  dispatch({
    type: SETREPORTCARDDATA,
    payload: repoetDate,
  });
};

//set Loading False
export const setLoading = (flag) => (dispatch) => {
  dispatch({
    type: SETLOADING,
    payload: flag,
  });
};

//set Loading False
export const getReportData = (flag) => (dispatch) => {
  console.log('jiji');
  // dispatch({
  //   type: SETLOADING,
  //   payload:flag
  // });
};
