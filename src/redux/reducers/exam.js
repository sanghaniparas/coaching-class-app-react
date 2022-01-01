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
  RESET_ANSWER_STATE,
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
  FETCHVIRIFYSAVEBUTTONSUCCESSEXAM,
  FETCHVIRIFYSAVEBUTTONFAILUREEXAM,
  BOOKMARKSOLUTONSUCCESSEXAM,
  BOOKMARKSOLUTONFAILUREEXAM,
  SETTIMERSTATE,
  REPLACE_SECTION_WISE_QUESTION,
} from '../actions/types';

const initialState = {
  testInstructions: {},
  reportOptions: '',
  answer: '',
  sectionNumber: 0,
  sectionWiseQuestion: [],
  currentSectionIndex: 0,
  currentQuestionIndex: 1,
  prevCurrentQuestionIndex: null,
  stateCount: {
    answered: 0,
    markedAnswered: 0,
    marked: 0,
    notAnswered: 0,
    notVisited: 0,
  },
  showInstruction: false,
  showQuestionPaper: false,
  showPortalInstruction: false,
  languageId: parseInt(localStorage.langId),
  sectionSummary: {},
  testSummary: [],
  reportCardData: [],
  recomandedCoaching: '',
  flagPauseExam: false,
  showSaveButton: false,
  resumeBtnClick: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SETTIMERSTATE:
      return {
        ...state,
        flagPauseExam: payload.flag,
        resumeBtnClick: payload.resumeBtnClk,
      };
    case FETCH_INSTRUCTION_SUCCESS:
      return {
        ...state,
        testInstructions: payload.data,
        loading: false,
      };
    case REPLACE_SECTION_WISE_QUESTION:
      return {
        ...state,
        sectionWiseQuestion: payload,
      };
    case FETCHREPORTSUCCESS:
      return {
        ...state,
        reportOptions: payload.data,
      };
    case FETCH_SECTION_SUMMARY_SUCCESS:
      return {
        ...state,
        sectionSummary: payload,
      };
    case FETCH_TEST_SUMMARY_SUCCESS:
      return {
        ...state,
        testSummary: payload,
      };
    case SETREPORTSUCCESS:
      return state;
    case SHOW_INSTRUCTION:
      return {
        ...state,
        showInstruction: payload,
      };
    case SHOW_QUESTION_PAPER:
      return {
        ...state,
        showQuestionPaper: payload,
      };
    case SHOW_PORTAL_INSTRUCTION:
      return {
        ...state,
        showPortalInstruction: payload,
        loading: false,
      };
    case LANGUAGE_CHANGE:
      return {
        ...state,
        languageId: payload,
      };
    case SAVE_ANSWER:
      return {
        ...state,
        answer: payload,
      };
    case FETCH_ANSWER_SUCCESS:
      return {
        ...state,
        stateCount: payload,
        loading: false,
      };
    case SAVE_SECTION_NUMBER:
      return {
        ...state,
        sectionNumber: payload,
      };
    case SECTION_WISE_QUESTION_STATE:
      let sectionWiseQuestion = [...state.sectionWiseQuestion];
      let index = sectionWiseQuestion.findIndex(
        (el) => el.sIndex === payload.sIndex && el.qIndex === payload.qIndex
      );

      if (index !== -1) {
        sectionWiseQuestion[index] = payload;
      } else {
        sectionWiseQuestion.push(payload);
      }

      return {
        ...state,
        sectionWiseQuestion,
      };
    case CURRENT_QUESTION_INDEX:
      let prevCurrentQuestionIndex =
        state.prevCurrentQuestionIndex == null
          ? payload
          : state.currentQuestionIndex;
      return {
        ...state,
        currentQuestionIndex: payload,
        prevCurrentQuestionIndex,
      };
    case FETCHVIRIFYSAVEBUTTONSUCCESSEXAM:
      return {
        ...state,
        showSaveButton: payload.bookmarked === 1 ? false : true,
        loading: false,
      };
    case BOOKMARKSOLUTONSUCCESSEXAM:
      return {
        ...state,
        showSaveButton: payload.code === 200 ? false : true,
        loading: false,
      };
    case RESET_ANSWER_STATE:
      return {
        ...state,
        answerState: payload,
      };
    case FETCHRECOMENDEDCOACHINGSUCCESS:
      return {
        ...state,
        recomandedCoaching: payload.data,
      };
    case FETCH_INSTRUCTION_FAILURE:
    case FETCHREPORTFAILURE:
    case FETCH_ANSWER_FAILURE:
    case FETCH_SECTION_SUMMARY_FAILURE:
    case FETCH_TEST_SUMMARY_FAILURE:
      return initialState;

    case SETREPORTFAILURE:
    case BOOKMARKSOLUTONFAILUREEXAM:
    case FETCHVIRIFYSAVEBUTTONFAILUREEXAM:
      return {
        ...state,
        loading: false,
      };
    case SETREPORTCARDDATA:
      return {
        ...state,
        reportCardData: payload,
        loading: false,
      };
    case SETLOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}

// return {
// 	...state,
// 	testInstructions: {},
// 	stateCount: {},
// 	sectionSummary: {},
// 	testSummary: {},
// 	loading: false,
//   };
