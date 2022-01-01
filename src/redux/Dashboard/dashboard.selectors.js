import { createSelector } from 'reselect';

// Input selectors
const selectDashboardData = (state) => state.dashboardData;

//For getting main dashboard data
export const selectDashboard = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData.dashboard
);

// For getting recent activities
export const selectRecentActivities = createSelector(
  [selectDashboard],
  (dashboard) => dashboard && dashboard.recent_activities
);
// For getting pass activities
export const selectPassActivities = createSelector(
  [selectDashboard],
  (dashboard) => dashboard && dashboard.pass_activities
);
// For getting test packages
export const selectTestPackages = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData.testPackages
);

// for getting test series
export const selectTestSeries = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData.testSeries
);

// for getting pass coachings
export const selectPassCoachings = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData.passCoachings
);

// for getting pass test cards
export const selectPassTestCards = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData.passCards
);
// for getting attempted test
export const selectAttemptedTest = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData.attemptedTest
);
// for getting practice sets
export const selectPracticeSet = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData.practiceSetData
);

// for getting package name
export const selectPackageName = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData.packageName
);
