import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Mail } from '../Layout/Icon';

export default function TopBar() {
  return (
    <Fragment>
      <div className="a-topbar">
        <div className="a-container">
          <div className="a-wrapper">
            <div className="a-topinfo">
              <div className="a-phone">
                <span>
                  <Phone />
                </span>
                <p>+91-8585857237 </p>
              </div>
              <div className="a-email">
                <span>
                  <Mail />
                </span>
                <p>support@admisure.com</p>
              </div>
            </div>
            <div className="a-topnav">
              <ul>
                <li>
                  <NavLink
                    to="/coaching"
                    isActive={(match, location) => {
                      if (['/coaching'].includes(location.pathname)) {
                        return true;
                      }

                      return false;
                    }}
                    activeClassName="a-nav">
                    Coaching
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coaching-pass" activeClassName="a-nav">
                    Pass
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/test-series-packages" activeClassName="a-nav">
                    Test Packages
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-sets" activeClassName="a-nav">
                    Practice
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/quiz" activeClassName="a-nav">
                    Quiz
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" activeClassName="">
                    Discuss
                  </NavLink>
                </li>
                <li>
                  <a
                    href="https://admisure.com/blog"
                    target="_blank"
                    activeClassName="">
                    Blog
                  </a>
                </li>
                <li>
                  <NavLink to="/" activeClassName="">
                    Language : <strong>English</strong>
                  </NavLink>
                </li>
                {/*<li>
                  <span>Discuss</span>
                </li>
                <li>
                  <span>Blog</span>
                </li>
                <li>
                  <span>Language</span>
                  <div className="a-language">
                  <span>English</span>
                  <span>Hindi</span>
                </div> 
                </li>*/}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
