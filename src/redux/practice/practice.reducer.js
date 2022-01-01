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

const initialState = {
  chapters: [],
  questions: [],
  staticQuestions: [],
  practiceReport: null,
  practiceStats: null,
  resumeState: null,
  givenAnswer: '',
  saveMessage: '',
  loading: true,
  practiceLoading:false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_PROGRESS:
        return {
          ...state,
          practiceLoading:true
        };

    case LOADING_FINISHED:
        return {
          ...state,
          practiceLoading:false
        };
    case FETCH_CHAPTERS_SUCCESS:
      return {
        ...state,
        chapters: payload,
        loading: false,
      };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: payload,
        staticQuestions: payload,
        loading: false,
      };
    case STORE_ANSWER_SUCCESS:
      return {
        ...state,
        givenAnswer: payload,
      };
    case UPDATE_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: state.questions.map((el) =>
          el.id === payload.id ? { ...el, ...payload } : el
        ),
        staticQuestions: state.staticQuestions.map((el) =>
          el.id === payload.id ? { ...el, ...payload } : el
        ),
      };

    case SAVE_ANSWER_SUCCESS:
      return {
        ...state,
        saveMessage: payload.message,
        loading: false,
      };

    case FETCH_PRACTICE_REPORT_SUCCESS:
      return {
        ...state,
        practiceReport: payload,
        loading: false,
      };
    case FILTER_QUESTION_SUCCESS:
      let newQuestions;
      if (payload === 2) {
        newQuestions = state.staticQuestions.filter((el) => el.isCorrect === 1);
      }
      if (payload === 3) {
        newQuestions = state.staticQuestions.filter((el) => el.isCorrect === 0);
      }
      if (payload === 4) {
        newQuestions = state.staticQuestions.filter(
          (el) => el.state === 'skipped'
        );
      }
      if (payload === 5) {
        newQuestions = state.staticQuestions.filter(
          (el) => el.isBookMarked === 1
        );
      }
      if (payload === 6) {
        newQuestions = state.staticQuestions.filter(
          (el) => el.state === 'unseen'
        );
      }

      return {
        ...state,
        questions: newQuestions,
        loading: false,
      };

    case RESUME_SUCCESS:
      return {
        ...state,
        resumeState: payload,
      };

    case PRACTICE_STATS_SUCCESS:
      return {
        ...state,
        practiceStats: payload,
      };
    case FETCH_CHAPTERS_FAILURE:
    case FETCH_QUESTIONS_FAILURE:
    case STORE_ANSWER_FAILURE:
    case UPDATE_QUESTIONS_FAILURE:
    case SAVE_ANSWER_FAILURE:
    case FETCH_PRACTICE_REPORT_FAILURE:
    case PRACTICE_STATS_FAILURE:
      return {
        ...state,
        chapters: [],
        questions: [],
        practiceReport: null,
        practiceStats: null,
        givenAnswer: '',
        saveMessage: '',
        loading: false,
      };
    default:
      return state;
  }
}
