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
} from './quiz.types';

//Initial State Object
const initialState = {
  quizPortalData: {},
  singleQuestion: {},
  questionState: [],
  statesCount: {},
  quizReport: {},
  solutionData: {},
  loading: true,
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
  
    case FETCH_QUIZ_QUESTION_SUCCESS:
      return {
        ...state,
        quizPortalData: payload,
        loading: false,
      };
    case SINGLE_QUESTION_SUCCESS:
      return {
        ...state,
        singleQuestion: payload,
      };
    case SAVE_QUESTION_STATE:
      let findQs = state.questionState.find(
        (el) => el.questionId === payload.questionId
      );

      if (findQs === undefined) {
        return {
          ...state,
          questionState: [...state.questionState, payload],
        };
      } else {
        return {
          ...state,
          questionState: state.questionState.map((el) =>
            el.questionId === payload.questionId
              ? { ...el, answerNo: payload.answerNo }
              : el
          ),
        };
      }

    case ANSWER_SAVE_SUCCESS:
      return {
        ...state,
        statesCount: payload,
      };

    case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        quizReport: payload,
      };

    case FETCH_SOLUTION_SUCCESS:
      return {
        ...state,
        solutionData: payload,
      };

    case FETCH_QUIZ_QUESTION_FAILURE:
    case SINGLE_QUESTION_FAILURE:
    case FETCH_REPORT_FAILURE:
    case FETCH_SOLUTION_FAILURE:
      return {
        ...state,
        quizPortalData: {},
        singleQuestion: {},
        quizReport: {},
        solutionData: {},
        loading: false,
      };
    default:
      return state;
  }
}
