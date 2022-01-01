import React from 'react';
import { UnlockLike, AdaptiveLearning, AffordablePricing, IndiaRanking, DetailedSolutions, Analytics } from '../../Core/Layout/Icon'


export default function PassFeatures() {
  return (
    <div className="practice-mock pass-features">
      <div className="a-container">
        <h2>Features </h2>

        <ul className="practicemock-row">
          <li>
            <span className="mock-icon"><UnlockLike /></span>
            <h4>Attempt Unlimited Tests</h4>
            <p>Select from the numerous tests curated by the top experts and leading faculty members of premium coaching centres.</p>
          </li>
          <li>
            <span className="mock-icon"><AdaptiveLearning /></span>
            <h4> Numerous Tests Covered</h4>
            <p>Attempt a variety of tests from Test Packages such as Mock Tests, Live Tests, Full Tests, Sectional Test and more to stay ahead in the race</p>
          </li>
          <li>
            <span className="mock-icon"><AffordablePricing /></span>
            <h4>Low Cost & Affordable </h4>
            <p>We are India's most affordable e-learning platform that aims to help students to crack their exam</p>
          </li>
          <li>
            <span className="mock-icon"><IndiaRanking /></span>
            <h4>Pattern Shield</h4>
            <p>Our platform is constantly updated with the latest exam pattern to match the real exam.</p>
          </li>
          <li>
            <span className="mock-icon"><DetailedSolutions /></span>
            <h4> Customer Support 24X7</h4>
            <p>Any query? We are available for you 24*7 to support or resolve your queries.</p>
          </li>
          <li>
            <span className="mock-icon"><Analytics /></span>
            <h4>Works on mobile and other devices</h4>
            <p>Access test series at your own comfort from your mobile device.</p>
          </li>
          {/* <li>
            <span className="mock-icon"><Analytics /></span>
            <h4>Insightful Personalized Analytics</h4>
            <p>Created by Exam Toppers, Experts and Top Faculity across the country. Comprehensive course material updated with latest Exam Pattersns.</p>
          </li>
          <li>
            <span className="mock-icon"><Analytics /></span>
            <h4>Insightful Personalized Analytics</h4>
            <p>Created by Exam Toppers, Experts and Top Faculity across the country. Comprehensive course material updated with latest Exam Pattersns.</p>
          </li> */}
        </ul>
      </div>
    </div>
  )
}
