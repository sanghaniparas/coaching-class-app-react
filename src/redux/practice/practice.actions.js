import {
  FETCH_CHAPTERS_FAILURE,
  FETCH_CHAPTERS_SUCCESS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  STORE_ANSWER_SUCCESS,
  STORE_ANSWER_FAILURE,
  UPDATE_QUESTIONS_SUCCESS,
  UPDATE_QUESTIONS_FAILURE,
  SAVE_ANSWER_FAILURE,
  SAVE_ANSWER_SUCCESS,
  FETCH_PRACTICE_REPORT_SUCCESS,
  FETCH_PRACTICE_REPORT_FAILURE,
  FILTER_QUESTION_SUCCESS,
  FILTER_QUESTION_FAILURE,
  RESUME_SUCCESS,
  PRACTICE_STATS_SUCCESS,
  PRACTICE_STATS_FAILURE,
  LOADING_FINISHED,
  LOADING_PROGRESS
} from './practice.types';
import axios from 'axios';
import { BASE_URL } from './../../config';

//For loading Authorization token
const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `${localStorage.token}`,
  },
};

// For fetching practice chapters
export const getChapters = ({ practiceSetId, subjectId }) => async (
  dispatch
) => {
  const body = JSON.stringify({
    practiceSetId,
    subjectId,
  });

  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/exam/practiceSet/chapters`, body, config);

    dispatch({
      type: FETCH_CHAPTERS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_CHAPTERS_FAILURE,
    });
  }
};

// for fetching chapter questions
export const fetchQuestions = (practiceSetResultId) => async (dispatch) => {
  const body = JSON.stringify({
    practiceSetResultId,
  });

  try {
    dispatch({
      type:LOADING_PROGRESS
    })
    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/exam/practiceSet/questions`,
      body,
      config
    );

    dispatch({
      type: FETCH_QUESTIONS_SUCCESS,
      payload: data,
    });
    dispatch({
      type:LOADING_FINISHED
    })
  } catch (err) {
    dispatch({
      type: FETCH_QUESTIONS_FAILURE,
    });
  }
};

// For just saving user given answer to store
export const storeAnswer = (ans) => (dispatch) => {
  try {
    dispatch({
      type: STORE_ANSWER_SUCCESS,
      payload: ans,
    });
  } catch (err) {
    dispatch({
      type: STORE_ANSWER_FAILURE,
    });
  }
};

// For updating the previous questions array with the latest question state
export const updateQuestion = (updatedObj) => (dispatch) => {
  try {
    dispatch({
      type: UPDATE_QUESTIONS_SUCCESS,
      payload: updatedObj,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_QUESTIONS_FAILURE,
    });
  }
};

// for saving answer to backend
export const saveAnswer = ({
  practiceSetResultId,
  practiceSetQuestionId,
  state,
  givenAnswer,
  questionTime,
}) => async (dispatch) => {
  const body = JSON.stringify({
    practiceSetResultId,
    practiceSetQuestionId,
    state,
    givenAnswer,
    questionTime,
  });

  try {
    const { data } = await axios.post(
      `${BASE_URL}/exam/practiceSet/saveAnswer`,
      body,
      config
    );

    dispatch({
      type: SAVE_ANSWER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SAVE_ANSWER_FAILURE,
    });
  }
};

// For getting chapter report
export const getPracticeReport = (practiceSetResultId) => async (dispatch) => {
  const body = JSON.stringify({
    practiceSetResultId,
  });

  try {
    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/exam/practiceSet/chapterWiseReport`,
      body,
      config
    );

    dispatch({
      type: FETCH_PRACTICE_REPORT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_PRACTICE_REPORT_FAILURE,
    });
  }
};

// For filtering questions
export const filterQuestions = (num) => (dispatch) => {
  try {
    dispatch({
      type: FILTER_QUESTION_SUCCESS,
      payload: num,
    });
  } catch (err) {
    dispatch({
      type: FILTER_QUESTION_FAILURE,
    });
  }
};

// For entering in resume mode
export const enterResume = (practiceSetResultId) => (dispatch) => {
  dispatch({
    type: RESUME_SUCCESS,
    payload: practiceSetResultId,
  });
};

// For getting practice stats --progress
export const getProgressStats = (practiceSetId) => async (dispatch) => {
  const body = JSON.stringify({
    practiceSetId,
  });

  try {
    const {
      data: { data },
    } = await axios.post(`${BASE_URL}/practiceSet/stats`, body, config);

    dispatch({
      type: PRACTICE_STATS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRACTICE_STATS_FAILURE,
    });
  }
};
