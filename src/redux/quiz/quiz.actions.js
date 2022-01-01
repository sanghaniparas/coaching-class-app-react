import {
  FETCH_QUIZ_QUESTION_SUCCESS,
  FETCH_QUIZ_QUESTION_FAILURE,
  SINGLE_QUESTION_SUCCESS,
  SINGLE_QUESTION_FAILURE,
  SAVE_QUESTION_STATE,
  ANSWER_SAVE_SUCCESS,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE,
  FETCH_SOLUTION_SUCCESS,
  FETCH_SOLUTION_FAILURE,
  Q_LOADING_TRUE
} from './quiz.types';
import axios from 'axios';
import { BASE_URL } from './../../config';

//For loading Authorization token
const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `${localStorage.token}`,
  },
};

// For fetching Home Page Data
export const getQuizPortalData = (quizId) => async (dispatch) => {
  const body = JSON.stringify({
    quizId,
  });

  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/exam/quiz`, body, config);
    if(data) {
      dispatch({
        type: FETCH_QUIZ_QUESTION_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: FETCH_QUIZ_QUESTION_SUCCESS,
        payload: {
          questions: [],
          quizConfig: {}
        },
      });
    }
    
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_QUIZ_QUESTION_FAILURE,
    });
  }
};



// export const setloadingq = (load) => (dispatch) => {
//   dispatch({
//     type: Q_LOADING_TRUE,
//     payload: load,
//   });
// };
//For filling up single question object in store
export const setSingleQuestion = (singleQs) => (dispatch) => {
  if (singleQs !== null || singleQs !== undefined) {
    console.log(`ans`, singleQs)
    dispatch({
      type: SINGLE_QUESTION_SUCCESS,
      payload: singleQs,
    });
  } else {
    dispatch({
      type: SINGLE_QUESTION_FAILURE,
    });
  }
};



//For setting a particular question state
export const setQuestionState = (qsState) => (dispatch) => {
  dispatch({
    type: SAVE_QUESTION_STATE,
    payload: qsState,
  });
};

// For saving answer for particular question
export const saveAnswer = ({
  quizResultId,
  quizQuestionId,
  givenAnswer,
  state,
}) => async (dispatch) => {
  const body = JSON.stringify({
    quizResultId,
    quizQuestionId,
    givenAnswer,
    state,
  });

  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/exam/quiz/saveAnswer`, body, config);

    dispatch({
      type: ANSWER_SAVE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

// For quiz report
export const getQuizReport = (quizResultId) => async (dispatch) => {
  const body = JSON.stringify({
    quizResultId,
  });

  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/exam/quiz/reportAfterTest`, body, config);

    dispatch({
      type: FETCH_REPORT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_REPORT_FAILURE,
    });
  }
};

// For getting quiz solution
export const getSolutionData = (quizResultId) => async (dispatch) => {
  const body = JSON.stringify({
    quizResultId,
  });
  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/exam/quiz/solution`, body, config);

    dispatch({
      type: FETCH_SOLUTION_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_SOLUTION_FAILURE,
    });
  }
};
