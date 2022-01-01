import { combineReducers } from 'redux';
import exam from './exam';
import auth from './auth';
import solution from './solution';
import global from './global';
import homePage from '../homepage/homepage.reducer';
import quizData from '../quiz/quiz.reducer';
import practiceData from '../practice/practice.reducer';
import profileData from '../MyProfile/profile.reducer';
import dashboardData from '../Dashboard/dashboard.reducer';

export default combineReducers({
  exam,
  auth,
  solution,
  homePage,
  quizData,
  practiceData,
  global,
  profileData,
  dashboardData,
});
