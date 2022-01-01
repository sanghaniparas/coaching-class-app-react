import React from 'react'
import Layout from '../../Core/Layout/Layout';
import { useHistory } from 'react-router-dom';

export default function AboutUs() {
  const history = useHistory();
  const goToHome = () => {
    history.push(`/`);
  }
  return (
    <Layout>
       <div className="about-wrapper">
         <div className="about-banner" style={{ backgroundImage: `url(${require('../../../assets/images/Aboutus.png')})` }}>
           <h2 className="t-title">About Us</h2>
         </div>
          <div className="about-main-container">
            <div className="a-container">
              <ul className="about-breadcrumb">
                <li onClick={() => goToHome()} style={{cursor: 'pointer'}}>Home</li>
                <li className="active">About Us</li>
              </ul>
              <h2 className="about-title">About Us</h2>
              {/* <h5 className="about-subtitle">We are on a mission to reshape the process of how students prepare online for competitive exams</h5> */}
              <p className="about-desc">Admisure is a premium preparation and practice platform catering to Government and Competitive exams such as SSC, Banking, Railways, CAT, Engineering and more. This platform gives aspirants the ability to conquer the fear of real exams and practice. It has plenty in store for educators and coaching institutes too. Admisure gives them a dashboard to maintain and manage their complete visibility. Right from maintaining students' records, their attendance to managing their performance and analysis, everything can be done under one roof. We are your one-stop solution for the Edu-tech industry.</p>
              <p className="about-desc">We strive to bring the online education system to the upfront and unite millions of students through our platform. We wish to stand strong with the educators and coaching institutes to help them grow their business manifolds.</p>
              <p className="about-desc">Established in 2018, Admisure's aim is to see every student nurture their dreams and let the educators and coaching institutes stand tall in the race to success. With our platform, we wish to envision a world full of possibilities for individuals be it students or educators, to reach the pinnacle of success in their respective fields.</p>
            </div>
            {/* VISION CARD START */}
            <div className="vision-wrapper">
              <div className="a-container">
                <div className="vision-card-wrap">
                   <div className="vision-card">
                     <div className="vision-card-img">
                       <img src={require('../../../assets/images/visionimg.png')} alt=""/>
                     </div>
                     <div className="vision-card-details">
                       <h3 className="title">Mission</h3>
                       <p className="desc">To bring global exam platform at your fingertips and raise the Ed-tech industry to contribute to the passion of educating one and all.  </p>
                     </div>
                   </div>

                   <div className="vision-card">
                     <div className="vision-card-img">
                       <img src={require('../../../assets/images/misionimg.png')} alt=""/>
                     </div>
                     <div className="vision-card-details">
                       <h3 className="title">Vision</h3>
                       <p className="desc">To strengthen the platform at such a level that everything related to Ed-tech industry falls under one roof and students and educators find it easy to navigate through the platform. </p>
                     </div>
                   </div>

                   <div className="vision-card">
                     <div className="vision-card-img">
                       <img src={require('../../../assets/images/beliefimg.png')} alt=""/>
                     </div>
                     <div className="vision-card-details">
                       <h3 className="title">Values</h3>
                       <p className="desc">To envision a platform for students, educators and coaching institutes with no compromise on Content Quality, Platform's security and Content piracy.</p>
                     </div>
                   </div>

                </div>
              </div>
            </div>
            {/* VISION CARD START END */}
            {/* MANAGE TEAM START */}
              {/* <div className="manageteam-wrap"> */}
                {/* <div className="a-container">
                  <h2 className="manageteam-title">Management Team</h2>
                  <div className="manageteam-inner">

                  {/* <div className="manageteam-card">
                      <div className="managecard-left">                       
                        <div className="manage-info">
                          <div className="info-box">
                            <h4>Virat kohli</h4>
                            <p>Co-Founder &amp; CEO</p>
                          </div>
                          <div className="info-box">
                            <p>Education: </p>
                            <h4>B.Tech.IIT BHU</h4>
                          </div>
                        </div>
                      </div>
                      <div className="managecard-right">
                       <p>Deepak Ranjan is instrumental in setting up the strategic direction of the company, defining company’s priorities, driving the mission and company’s work culture. He brings with him 13 years of expertise across domains like technology, digital marketing, growth hacking, customer acquisition and hiring. Prior to co-founding Edureka, he headed the R&amp;D at DbyDX Labs. </p>
                      </div> 
                    </div> */}


                    {/* <div className="manageteam-card">
                      <div className="managecard-left">
                        <div className="manage-img">
                          <img src={require('../../../assets/images/about-02.jpg')} alt=""/>
                        </div>
                        <div className="manage-info">
                          <div className="info-box">
                            <h4>Virat kohli</h4>
                            <p>Co-Founder &amp; CEO</p>
                          </div>
                          <div className="info-box">
                            <p>Education: </p>
                            <h4>B.Tech.IIT BHU</h4>
                          </div>
                        </div>
                      </div>
                      <div className="managecard-right">
                       <p>Deepak Ranjan is instrumental in setting up the strategic direction of the company, defining company’s priorities, driving the mission and company’s work culture. He brings with him 13 years of expertise across domains like technology, digital marketing, growth hacking, customer acquisition and hiring. Prior to co-founding Edureka, he headed the R&amp;D at DbyDX Labs. </p>
                      </div> 
                    </div> */}

                    {/* <div className="manageteam-card">
                      <div className="managecard-left">
                        <div className="manage-img">
                          <img src={require('../../../assets/images/about-03.jpg')} alt=""/>
                        </div>
                        <div className="manage-info">
                          <div className="info-box">
                            <h4>Virat kohli</h4>
                            <p>Co-Founder &amp; CEO</p>
                          </div>
                          <div className="info-box">
                            <p>Education: </p>
                            <h4>B.Tech.IIT BHU</h4>
                          </div>
                        </div>
                      </div>
                      <div className="managecard-right">
                       <p>Deepak Ranjan is instrumental in setting up the strategic direction of the company, defining company’s priorities, driving the mission and company’s work culture. He brings with him 13 years of expertise across domains like technology, digital marketing, growth hacking, customer acquisition and hiring. Prior to co-founding Edureka, he headed the R&amp;D at DbyDX Labs. </p>
                      </div> 
                    </div> */}

                    {/* </div>
                </div>  */}
              {/* </div> */}
            {/* MANAGE TEAM END */}
          </div>
       </div>
    </Layout>
  )
}
