import React, { Fragment } from 'react';
import {
  FooterFacebook,
  FooterLinkedin,
  FooterTwitter,
  FooterGoogle,
  FooterInstagram,
  FooterYoutube,
} from '../Layout/Icon';
import SubFooter from './SubFooter';

const Footer = () => {
  return (
    <Fragment>
      <div className="a-footer a-footerBg">
        <div className="a-container">
          <div className="a-wrapper a-wrapFooter">
            <ul>
              <li>
                <div className="a-footerLogo">
                  <span>
                    <img
                      src={require('../../../assets/images/betalogo.png')}
                      alt="admisure"
                    />
                  </span>
                  <p>Admisure Educational Services Pvt. Ltd.</p>
                  <p>
                  32/5, Sahapur colony, Near Mahindra Service Centre, <br />
                    New Alipore, Kolkata,700053 <br />
                  </p>
                  <p>
                    <a href="mailto:support@admisure.com">
                      support@admisure.com
                    </a>
                  </p>
                  <h5>Office Hours:</h5>
                  <b>Available From Monday – Saturday</b>
                  <b>10 AM – 7PM</b>
                </div>
              </li>
              <li>
                <div className="a-footerWrap">
                  <h5>Company</h5>
                  <ul>
                    <li>
                      <span> <a href="/about-us" target="_blank">
                      About Us
                        </a></span>
                    </li>
                    <li>
                      <span>
                        <a href="/coaching-terms" target="_blank">
                          Coaching Terms
                        </a>
                      </span>
                    </li>
                    <li>
                      <span>
                        <a href="/contact-us" target="_blank">
                          Contact Us
                        </a>{' '}
                      </span>
                    </li>
                    <li>
                      <span>
                        <a href="/terms-and-conditions" target="_blank">
                          Terms &amp; Condition
                        </a>
                      </span>
                    </li>
                    <li>
                      <span>
                        <a href="/privacy-policy" target="_blank">
                          Privacy Policy
                        </a>
                      </span>
                    </li>
                    <li>
                      <span> <a href="/careers" target="_blank">
                      Careers
                        </a></span>
                    </li>
                    {/* <li>
                      <span>Investor Relations</span>
                    </li> */}
                    <li>
                      <span>
                        <a href="/intellectual-property-policy" target="_blank">
                          Intellectual Property Policy
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="a-footerWrap">
                  <h5>Popular Exam</h5>
                  <ul>
                    <li>
                      <span>SSC</span>
                    </li>
                    <li>
                      <span>Banking</span>
                    </li>
                    <li>
                      <span>Railways</span>
                    </li>
                    <li>
                      <span>Gate</span>
                    </li>
                    <li>
                      <span>IBPS</span>
                    </li>
                    <li>
                      <span>SSC CGL</span>
                    </li>
                    <li>
                      <span>SSC CHSL</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="a-footerWrap">
                  <h5>Other Links</h5>
                  <ul>
                    {/* <li>
                      <span>Refer &amp; Earn</span>
                    </li>
                    <li>
                      <span>Promo</span>
                    </li> */}
                    <li style={{marginBottom:'10px'}}>
                    <a
                href="https://admisure.com/blog"
                activeClassName="a-nav"
                target="_blank">
                Blog                
              </a>
                    </li>
                    <li>
                      <span>Discuss</span>
                    </li>
                    <li>
                      <span>Register as Coaching</span>
                    </li>
                    {/* <li>
                      <span>Sitemap</span>
                    </li> */}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="a-footer-social">
          <div className="a-container">
            <div className="a-footer-social-left">
              <p>Follow us</p>
              <ul>
                <li>
                  <span>
                    <a href="https://www.facebook.com/admisure" target="_blank"><FooterFacebook /></a>
                    
                  </span>
                </li>
                <li>
                  <span>
                    <a href="https://www.linkedin.com/company/admisure/" target="_blank"><FooterLinkedin /></a>
                  </span>
                </li>
                <li>
                  <span>
                  <a href="https://twitter.com/admisure" target="_blank"><FooterTwitter /></a>
                  </span>
                </li>
                {/* <li>
                  <span>
                  <a href=""> <FooterGoogle /></a>
                  </span>
                </li> */}
                <li>
                  <span>
                  <a href="https://www.instagram.com/admisure/" target="_blank"> <FooterInstagram /></a>
                  </span>
                </li>
                <li>
                  <span>
                  <a href="https://www.youtube.com/channel/UCoSoaJv2hPzHxtTIp9C0bwA" target="_blank"> <FooterYoutube /></a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="a-copyright">
          <p>
            Copyright &copy; Admisure Educational Services Pvt. Ltd. 2021. All
            rights reserved.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
