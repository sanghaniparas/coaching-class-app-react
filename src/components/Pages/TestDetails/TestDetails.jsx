import React, { useEffect, useState } from "react";
import Layout from "../../Core/Layout/Layout";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import TestBannerBottom from "./TestBannerBottom";
import TestDetailsBanner from "./TestDetailsBanner";
import TestExamFeatures from "./TestExamFeatures";
import TestExamTab from "./TestExamTab";
import TestFreePackages from "./TestFreePackages";
import TestPass from "./TestPass";
import TestPractice from "./TestPractice";
import TestQuizzes from "./TestQuizzes";
import TestSeriesTest from "./TestSeriesTest";
import axios from "axios";
import { BASE_URL } from "./../../../config";
import TestFaq from "./TestFaq";
import TestBlogs from "./TestBlogs";
import PopularExams from "./PopularExams";
import { useLocation } from 'react-router-dom';

export default function TestDetails() {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log("subodh");
    console.log(location);
    let routeState
    if(location.state){
        localStorage.setItem('routeState', JSON.stringify(location.state))
        routeState = location.state
    } else {
        routeState = localStorage.getItem('routeState')
        if(routeState) routeState = JSON.parse(routeState)
    }

    if(routeState){
        console.log("use routeState ahead");
        (async function getDetails() {
          try {
            const {
              data: { data },
            } = await axios.get(`${BASE_URL}/examPage/details/${routeState.examId}`);
           
            setData(data);
          } catch (error) {
            console.log(error);
          }
        })();
    } 
    
 }, [location]);


  // useEffect(() => {
  //   (async function getDetails() {
  //     try {
  //       const {
  //         data: { data },
  //       } = await axios.get(`${BASE_URL}/examPage/details/${match.params.id}`);
       
  //       setData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <Layout>
      {data === null ? (
        <div style={{ minHeight: "100vh" }}>
          <Loader
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            type="Oval"
            color="#FF7249"
            height={40}
            width={40}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <div className="a-wrapper practiceDetails test-details">
          <TestDetailsBanner data={data} />
          <TestBannerBottom data={data} />
          {data && data.examPageInfoCategory .length > 0 ?<TestExamTab data={data} /> : <div className="a-nodata-Content">No data found</div>}
          {data && data.examPageSection.length > 0 ? (
            <React.Fragment>
              {data.examPageSection.map((el) => {
                if (el.productType === 1) {
                  return <TestFreePackages data={el} />;
                }

                if (el.productType === 2) {
                  return <TestPractice data={el} />;
                }

                if (el.productType === 3) {
                  return <TestQuizzes data={el} />;
                }
              })}
            </React.Fragment>
          ) : (
           null
          )}

          <TestPass data={data} /> 
          <TestExamFeatures />
          <TestFaq data={data} />
          <TestBlogs data={data} />
          <PopularExams data={data} />
        </div>
      )}
    </Layout>
  );
}
