import React from 'react'
import Layout from '../../Core/Layout/Layout'

export default function Careers() {
  return (
    <div>
      <Layout>
      <div className="terms-wrapper">
          <div className="terms-banner" style={{backgroundImage: `url(${require('../../../assets/images/Career.png')})`,
            }}>
            <h2 className="t-title" style={{textAlign:'center', fontSize: '2.8em'}}>Careers</h2>
          </div>
          <div className="a-container">
          <h4 className="t-subtitle" style={{textAlign:'center', fontSize: '2.2em'}}>Learn. Rise. Inspire. Welcome to Admisure!</h4>
            <p>
            At Admisure, we strive to reach excellence in everything we do. Our endeavour is to give equal opportunity to each employee and let them grow organically and allow them to build their professional career. ‘Work hard and party harder’ is the way for us at Admisure with employees given the freedom to bring out the best in them and excel in the field they are best suited to. Our motto is to drive success by bringing the employees together with us in the growth journey.
            </p>
            <h4 className="t-subtitle" style={{textAlign:'center', fontSize: '2.2em'}}>Benefits of working at Admisure</h4>
            <div className="box-wrap">

              <div className="box">
                <img src={require('../../../assets/images/reading1.svg')} alt="" />
                <h3>Open culture</h3>
                <p>We have an open culture, where Founders and employees brainstorm together to take the company to scale greater heights. Every employee has the access to the Founder and Co-founders and discuss and put forward their valuable inputs, which are heartily welcomed and equally appreciated.</p>
              </div>

              <div className="box">
                <img src={require('../../../assets/images/partner.svg')} alt="" />
                <h3>Growing together</h3>
                <p>'United we stand, divided we fall', thus unity in growth is an equally important aspect for us. We believe in giving equal opportunity to each of our employees and allowing them to learn and build with us.</p>
              </div>

              <div className="box">
                <img src={require('../../../assets/images/work.svg')} alt="" />
                <h3>Friendly work environment</h3>
                <p>We encourage a working environment that allows freedom of speech and value for ethics. Our company promotes a friendly work environment where employees interact in their comfort zone and without any fear of getting judged.</p>
              </div>

              <div className="box">
                <img src={require('../../../assets/images/balance.svg')} alt="" />
                <h3>Work-life balance</h3>
                <p>We strive to help our employees strike the perfect balance to manage their professional and personal life at par. Our flexible working hours permit our employees, the time to match their priorities and maintain a healthy work-life balance.</p>
              </div>

            </div>
            <p>Our mindset is to create an ecosystem where employees come together to transform the company in unity. If this excites you, come along to celebrate the journey towards success.</p>

            {/* <h4 className="position">Current open positions:</h4> */}
          </div>  
        </div>  
      </Layout>
    </div>
  )
}
