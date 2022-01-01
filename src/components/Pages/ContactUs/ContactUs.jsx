import React from 'react';
import Layout from '../../Core/Layout/Layout';
import { useHistory } from 'react-router-dom';

export default function ContactUs() {
  const history = useHistory();
  const goToHome = () => {
    history.push(`/`);
  }
  return (
    <>
      <Layout>
        <div className="contactus-wrapper">
          <div className="a-container">
            <div className="breadcrumb">
              <ul>
                <li onClick={() => goToHome()} style={{cursor: 'pointer'}}>
                  <span>Home</span>
                </li>
                <li>
                  <span>Contact Us</span>
                </li>
              </ul>
            </div>
            <div className="contactus-container">
              <div className="contact-info-container">
                <div className="contact-info-box">
                  <div className="circle-box">
                    <img
                      src={require('../../../assets/images/reading.svg')}
                      alt=""
                    />
                  </div>
                  <h3>Student Support</h3>
                  <h4 className="sub-title">Let us Help</h4>
                  <p className="info">
                    <strong>Email: </strong> support@admisure.com
                  </p>
                  <p className="info">
                    <strong>Phone: </strong> +91 8585857237
                  </p>
                </div>
                <div className="contact-info-box">
                  <div className="circle-box">
                    <img
                      src={require('../../../assets/images/employee.svg')}
                      alt=""
                    />
                  </div>
                  <h3>Coaching Support</h3>
                  <h4 className="sub-title">Let us Help</h4>
                  <p className="info">
                    <strong>Email: </strong> support@admisure.com
                  </p>
                  <p className="info">
                    <strong>Phone: </strong> +91 8585857237
                  </p>
                </div>
              </div>
              <div className="contact-form-container">
                <div className="form-outer">
                  <div className="form-card">
                    <h2 className="title">Raise Ticket</h2>
                    <form action="">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name*"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Number*"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email*"
                        />
                      </div>
                      <div className="form-group">
                        <select name="" className="form-control" id="">
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value="">Student</option>
                          <option value="">
                            Individual Creator / Coaching
                          </option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select name="" className="form-control" id="">
                          <option value="">Select Query</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <textarea
                          placeholder="Message"
                          className="form-control"></textarea>
                      </div>
                      <button className="btn-primary">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
