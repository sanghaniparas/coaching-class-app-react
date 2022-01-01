import React, { useState, useEffect } from 'react';
import moment from 'moment';
import TestSeriesHeader from './TestSeriesHeader';
import TestSeriesAcademy from './TestSeriesAcademy';
import TestSeriesPackageDetails from './TestSeriesPackageDetails';
import TestSeriesInfo from './TestSeriesInfo';
import TestSeriesFeatures from './TestSeriesFeatures';
import TestSeriesSimilarPackage from './TestSeriesSimilarPackage';
import TestSeriesOtherPackages from './TestSeriesOtherPackages';
import TestSeriesFaq from './TestSeriesFaq';
import { BASE_URL } from './../../../config';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import JsonLd from './../../../utils/JsonLd';

import axios from 'axios';
import Layout from './../../Core/Layout/Layout';
import TestSeriesShare from './TestSeriesShare';
import TestSeriesReviews from './TestSeriesReviews';
import useProductSchema from './../../../Hooks/useProductSchema';
import useReviewSchema from './../../../Hooks/useReviewSchema';
import ReactMeta from '../../../utils/ReactMeta';

const TestSeriesDetails = (props) => {
  const [testDetails, setTestDetails] = useState({});
  const [faq, setFaq] = useState({});
  const [features, setFeatures] = useState({});
  const [loading, setLoading] = useState(true);
  const [testEnroll, setEnroll] = useState(false);
  const [packageRelatedPass, setPackageRelatedPass] = useState();
  const [shareCount, setShareCount] = useState(0);
  //   Custom hook
  const data = useProductSchema(props.match.params.id);
  const data2 = useReviewSchema(props.match.params.id);

  const config = {
    headers: {
      Authorization: `${localStorage.token ? localStorage.token : null}`,
    },
  };
  const getSharedCount = async () => {
    try {
      const payload = { packageId: props.match.params.id };
      const response = await axios.post(
        `${BASE_URL}/shareandunlock/get-share-unlock`,
        payload,
        config
      );
      console.log('response', response);
      setShareCount(response.data.data.shareData);
    } catch (err) {
      console.log(err);
    }
  };

  const getPackageRelatedPass = async () => {
    try {
      const payload = { testPackageId: props.match.params.id };
      const response = await axios.post(
        `${BASE_URL}/testPackage/package-coaching-related-pass`,
        payload,
        config
      );
      setPackageRelatedPass(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem('inReport', 0);
    const val = document.getElementsByTagName('HTML')[0];
    val.style = '';
    async function fetchTestSeriesDetails() {
      try {
        const response = await axios.get(
          `${BASE_URL}/testPackage/details/${props.match.params.id}`,
          config
        );
        setLoading(false);
        if(response && response.data && response.data.data){
          setTestDetails(response.data.data);
          setFaq(response.data.data.faqs);
          setFeatures(response.data.data.features);
        }
      
      } catch (err) {
        console.log(err);
      }
    }
    fetchTestSeriesDetails();
    getSharedCount();
    getPackageRelatedPass();
  }, []);

  const setTestEnrolled = (flag) => setEnroll(flag);
  const registerlinkShare = async () => {
    try {
      const payload = {
        packageId: testDetails.testpackageDetails.id,
        shareNumber: 1,
        shareDate: moment(new Date()).format('YYYY-MM-DD'),
      };
      const response = await axios.post(
        `${BASE_URL}/shareandunlock/save-share-unlock`,
        payload,
        config
      );
      if (response.data.code == 200) {
        getSharedCount();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log('packageRelatedPass', packageRelatedPass);
  return (
    <Layout>
      <div className="a-wrapper light-grey-bg testseries-details">
        <div className="a-container">
          <div className="a-coaching-card-details">
            <>
              <TestSeriesHeader
                testDetails={testDetails}
                setTestEnrolled={setTestEnrolled}
                packageRelatedPass={packageRelatedPass}
                shareCount={shareCount}
              />
              <TestSeriesAcademy coachingId={2} testDetails={testDetails} />
              {testDetails?.testpackageDetails?.saleType === 2 && (
                <TestSeriesShare
                  shareCount={shareCount}
                  testDetails={testDetails}
                  registerlinkShare={registerlinkShare}
                  match={props.match}
                />
              )}

              <TestSeriesPackageDetails
                testDetails={testDetails}
                testEnroll={testEnroll}
              />

              <TestSeriesInfo testDetails={testDetails} />
              <TestSeriesFeatures features={features} />
              <TestSeriesReviews testDetails={testDetails} />
              <TestSeriesFaq
                faqCoaching={Object.keys(faq).length === 0 ? null : faq}
              />
              <TestSeriesOtherPackages testDetails={testDetails} />
              <TestSeriesSimilarPackage testDetails={testDetails} />
            </>
          </div>
        </div>
      </div>
      <JsonLd data={JSON.stringify(data)} />
      <JsonLd data={JSON.stringify(data2)} />
      {Object.keys(testDetails).length && (
        <ReactMeta data={testDetails.testpackageDetails.seoDescriptions} />
      )}
    </Layout>
  );
};

export default TestSeriesDetails;
