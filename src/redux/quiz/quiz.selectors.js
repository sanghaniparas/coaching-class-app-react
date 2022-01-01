import { createSelector } from 'reselect';

// Input selectors
const selectQuizData = (state) => state.quizData;
const selectQuizPortalData = (state) => state.quizData.quizPortalData;
const selectQuizSingleQuestion = (state) => state.quizData.singleQuestion;
const selectQuizReportData = (state) => state.quizData.quizReport;


//For getting quiz configs
export const selectQuizPortalConfig = createSelector(
  [selectQuizPortalData],
  (quizPortalData) => quizPortalData.quizConfig
);

//For getting questions of quiz portal

// export const selectrefreshvar = createSelector(
//   [selectQuizData],
//   (quizData) =>  quizData.refershvar
//    );

// export const selectloading = createSelector(
//   [selectQuizData],
//   (quizData) =>  quizData.qloading
//    );


export const selectQuizQuestions = createSelector(
  [selectQuizPortalData],
  (quizPortalData) => quizPortalData.questions
   );
// For geeting the single question from store
export const selectSingleQuestion = createSelector(
  [selectQuizSingleQuestion, selectQuizPortalData],
  (singleQuestion, quizPortalData) =>
    Object.keys(quizPortalData).length > 0 && singleQuestion
);

// For getting question state
export const selectQuestionState = createSelector(
  [selectQuizData],
  (quizData) => quizData.questionState
);

// For getting state count
export const selectStatesCount = createSelector(
  [selectQuizData],
  (quizData) => quizData.statesCount
);

// For getting quiz report
export const selectQuizReport = createSelector(
  [selectQuizReportData],
  (quizReport) => quizReport
);

// For getting solution config
export const selectSolutionConfigData = createSelector(
  [selectQuizData],
  (quizData) => quizData.solutionData.quizConfig
);

// For getting solution questions
export const selectSolutionQuestions = createSelector(
  [selectQuizData],
  (quizData) => quizData.solutionData.questions
);

// For geeting the single question from store
export const selectSolutionSingleQuestion = createSelector(
  [selectQuizData],
  (quizData) => quizData.singleQuestion
);
