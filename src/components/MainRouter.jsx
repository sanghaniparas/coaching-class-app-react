import React, { useEffect, useLayoutEffect } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { getProfile } from './../redux/MyProfile/profile.actions';

import Home from './Pages/Home/sections/Home';
import Coaching from './Pages/Coaching/Coaching';
import CoachingDetails from './Pages/CoachingDetails/CoachingDetails';
import PracticeType from './Pages/PracticeType';
import Pass from './Pages/Pass';
import Quiz from './Pages/Quiz';
import TestSeriesDetails from './Pages/TestSeriesDetails/TestSeriesDetails';
import ResetPassword from './Pages/Login/ResetPassword';
import PortalInstruction from './Pages/Exam/PortalInstruction/PortalInstruction';
import TestInstruction from './Pages/Exam/TestInstruction/TestInstruction';
import MainExam from './Pages/Exam/MainExam/MainExam';
import PracticeDetails from '../components/Pages/PracticeExam/PracticeDetails/PracticeDetails';
import ReportCard from './Pages/Exam/ReportCard';
import SolutionPage from './Pages/Exam/SolutionPage/pages/SolutionPage';
import ErrorPage from './Pages/404/ErrorPage';
import TestPackages from './Pages/TestPackages';
import QuizDetails from './Pages/QuizExam/QuizPortal/sections/QuizDetails';
import QuizReport from './Pages/QuizExam/QuizReport/sections/QuizReport';
import QuizSolution from './Pages/QuizExam/QuizSolution/sections/QuizSolution';
import TestDetails from './Pages/TestDetails/TestDetails';
import PracticePortal from './Pages/PracticeExam/PracticePortal/sections/PracticePortal';
import SearchPage from './Pages/SearchResult';
import MyProfile from '../components/Pages/MyProfile/sections/MyProfile';
import MyCarts from './Pages/CartPage';
import { useDispatch } from 'react-redux';
import PrivateRoute from './Routes/PrivateRoute';
import Paymentsuccess from './Pages/Payment/paymentSuccess';
import PaymentError from './Pages/Payment/paymentError';

// Dashboard
import Dashboard from './Dashboard/Pages/Dashboard';
import TestSeries from './Dashboard/Pages/TestSeries';
import TestSeriesPackage from './Dashboard/Pages/TestSeriesPackage';
import PassAccess from './Dashboard/Pages/PassAccess';
import AttemptedTest from './Dashboard/Pages/AttemptedTest';
import { Performance } from './Dashboard/Pages/Performance';
import Practice from './Dashboard/Pages/Practice';
import { Quizzes } from './Dashboard/Pages/Quizzes';
import { SavedQuestion } from './Dashboard/Pages/SavedQuestion';
import TermsConditions from './Pages/TermsConditions/TermsConditions';
import PrivacyPolicy from './Pages/TermsConditions/PrivacyPolicy';
import IntellectualPropertyPolicy from './Pages/TermsConditions/IntellectualPropertyPolicy';
import CoachingInstituteTerms from './Pages/TermsConditions/CoachingInstituteTerms';
import ContactUs from './Pages/ContactUs/ContactUs';
import AboutUs from './Pages/AboutUs/AboutUs';


// Careers 
import Careers from './Pages/Careers/Careers';

const MainRouter = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      localStorage.getItem('token') !== '' &&
      localStorage.getItem('token') !== null
    ) {
      dispatch(getProfile());
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/coaching" component={Coaching} />
      <Route
        exact
        path="/practiceportal/:practiceId/:subjectId"
        component={PracticePortal}
      />
      <PrivateRoute component={MyProfile} path="/profile" exact />
      <Route exact path="/quizdetails/:id" component={QuizDetails} />
      <Route exact path="/quizreport/:quizId/:id" component={QuizReport} />
      <Route exact path="/quizsolution/:id" component={QuizSolution} />
      <Route exact path="/resetpassword/:id" component={ResetPassword} />
      <Route exact path="/practice-sets" component={PracticeType} />
      <Route exact path="/coaching-pass" component={Pass} />
      <Route exact path="/test-series-packages" component={TestPackages} />
      <Route exact path="/quiz" component={Quiz} />
      <Route exact path="/coaching/:id" component={CoachingDetails} />
      <Route exact path="/testdetails/:id" component={TestSeriesDetails} />
      <Route exact path="/practice-details/:id" component={PracticeDetails} />
      <Route exact path="/report-card" component={ReportCard} />

     
      <Route exact path="/testsolution/:id" component={SolutionPage} />

      <Route exact path="/portal-instructions" component={PortalInstruction} />
     
      <Route exact path="/test-instructions" component={TestInstruction} />
     
      <Route exact path="/exam" component={MainExam} />
      {/* <Route exact path="/exam/:id" component={MainExam} /> */}
      <Route exact path="/searchpage" component={SearchPage} />
      <Route exact path="/cart" component={MyCarts} />
      <Route exact path="/exam/:id" component={TestDetails} />

      {/* TERMS AND CONDITIONS */}
      <Route exact path="/terms-and-conditions" component={TermsConditions} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route
        exact
        path="/intellectual-property-policy"
        component={IntellectualPropertyPolicy}
      />
      <Route exact path="/coaching-terms" component={CoachingInstituteTerms} />

      {/* Contact Us */}
      <Route exact path="/contact-us" component={ContactUs} />
      {/* About Us */}
      <Route exact path="/about-us" component={AboutUs} />
      {/* Careers */}
      <Route exact path="/careers" component={Careers}/>

      {/* Payment */}
      <Route exact path="/payment-success" component={Paymentsuccess}/>
       <Route exact path="/payment-error" component={PaymentError}/>

      {/* DASHBOARD */}
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute
        exact
        path="/test-series/:packageId"
        component={TestSeries}
      />
      <PrivateRoute
        exact
        path="/test-series-package"
        component={TestSeriesPackage}
      />
      <PrivateRoute exact path="/pass-access" component={PassAccess} />
      <PrivateRoute exact path="/attempted-test" component={AttemptedTest} />
      <PrivateRoute exact path="/performance" component={Performance} />
      <PrivateRoute exact path="/practice-dashboard" component={Practice} />
      <PrivateRoute exact path="/quizzes" component={Quizzes} />
      <PrivateRoute exact path="/save-question" component={SavedQuestion} />

      <Route exact path="/nomatch" component={ErrorPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default MainRouter;
