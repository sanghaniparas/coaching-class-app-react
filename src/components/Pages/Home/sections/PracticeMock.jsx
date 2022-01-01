import React from 'react';
import {
  UnlockLike,
  AdaptiveLearning,
  AffordablePricing,
  IndiaRanking,
  DetailedSolutions,
  Analytics,
} from '../../../Core/Layout/Icon';

export default function PracticeMock() {
  return (
    <div className="practice-mock">
      <div className="a-container">
        <h2>Why Admisure?</h2>
        <p>We work hard to make sure you get maximum worth of your money</p>
        <ul className="practicemock-row">
          <li>
            <span className="mock-icon">
              <UnlockLike />
            </span>
            <h4>Premium Content</h4>
            <p>
            With our top rated online tests curated by individual faculties and leading coaching institutes, we give you a platform to excel.
            </p>
          </li>
          <li>
            <span className="mock-icon">
              <AdaptiveLearning />
            </span>
            <h4>Adaptive Learning</h4>
            <p>
            Consistent learning helps you adapt to the learning environment and in turn gives you better grades to keep going. 
            </p>
          </li>
          <li>
            <span className="mock-icon">
              <AffordablePricing />
            </span>
            <h4>Affordable Pricing </h4>
            <p>
            India’s most affordable Test Series platform to cater to the needs of every Indian willing to study.
            </p>
          </li>
          <li>
            <span className="mock-icon">
              <IndiaRanking />
            </span>
            <h4>Detailed Analysis </h4>
            <p>
            Our in depth reports give you a perfect platform to do comparison analysis with the topper and comprehend the milestones that you can follow to learn and unlearn.
            </p>
          </li>
          <li>
            <span className="mock-icon">
              <DetailedSolutions />
            </span>
            <h4>Real Exam Environment</h4>
            <p>
            Experience our online tests similar to the real exam interface and conquer the fear of writing your final exam.
            </p>
          </li>
          <li>
            <span className="mock-icon">
              <Analytics />
            </span>
            <h4>Easy to Access </h4>
            <p>
            Access your test series, practice sets and quizzes anywhere, anytime at your convenience. 

            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
