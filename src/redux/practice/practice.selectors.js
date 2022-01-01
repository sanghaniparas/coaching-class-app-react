import { createSelector } from 'reselect';

// Input selectors
const selectPracticeData = (state) => state.practiceData;

//For getting practice chapters
export const selectPracticeChapters = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.chapters
);

// For getting questions of a single chapter
export const selectPracticeQuestions = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.questions
  //(practiceData) => Array.from(new Set(practiceData.questions.map(JSON.stringify))).map(JSON.parse)

);

// For getting user given answer from store
export const selectGivenAnswer = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.givenAnswer
);

// For gettinmg the practice report
export const selectPracticeReport = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.practiceReport
);

// For getting loading state
export const selectPracticeLoader = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.loading
);

// For getting static array of questions
export const selectStaticPracticeQuestions = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.staticQuestions
);

// Getting resume state
export const selectResumeState = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.resumeState
);

// getting practice stats
export const selectPracticeStats = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.practiceStats
);

//practice loading 

export const selectPracticeLoading = createSelector(
  [selectPracticeData],
  (practiceData) => practiceData.practiceLoading
);