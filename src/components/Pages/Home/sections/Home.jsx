import React, { useState, useEffect } from 'react';
import Layout from '../../../Core/Layout/Layout';
import Toast from '../../Elements/Toast';
import Banner from './Banner';
import ExploreTestSeries from './ExploreTestSeries';
import FeaturedCoaching from './FeaturedCoaching';
import PracticeSetsAndQuizzes from './PracticeSetsAndQuizzes';
import ShareAndUnloack from './ShareAndUnloack';
import PracticeMock from './PracticeMock';
import AboutUs from './AboutUs';
import BlogsNews from './BlogsNews';
import SubFooter from '../../../Core/Footer/SubFooter';
import { connect, useDispatch } from 'react-redux';
import { getHomeData } from './../../../../redux/homepage/homepage.actions';
import TestPackages from './TestPackages';
import { createStructuredSelector } from 'reselect';
import { selectHomeSeos , selectHomesiteSettings } from './../../../../redux/homepage/homepage.selectors';
import ReactMeta from '../../../../utils/ReactMeta';
import { Helmet } from "react-helmet";

const Home = ({ seo,siteSettings }) => {
  

  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);

  const [useSeo, setSetSeo] = useState(null);


  //   For dispatching actions
  const dispatch = useDispatch();

  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  useEffect(() => {
    dispatch(getHomeData());
    setSetSeo(seo);

    console.log(useSeo)
  }, []);
  return (
    <Layout>

   

      <Banner />

      <div className="a-wrapper a-homepage">
        <ExploreTestSeries />
        <FeaturedCoaching />
        <PracticeSetsAndQuizzes />
        <ShareAndUnloack />
        <TestPackages />
        <PracticeMock />
        <AboutUs />
        <BlogsNews />
        <SubFooter />
      </div>
      <Toast isVisible={isVisible} toastMessage={toastMessage} />
      {seo !== null && seo !== undefined && seo.length && siteSettings !== undefined && siteSettings.length ? (
        <ReactMeta title={seo[0].seoTitle} description={seo[0].seoDesc} favicon={siteSettings[2].ImageUrl} />
      ) : (
          ''
        )}
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  seo: selectHomeSeos,
  siteSettings:selectHomesiteSettings
});

export default connect(mapStateToProps)(Home);
