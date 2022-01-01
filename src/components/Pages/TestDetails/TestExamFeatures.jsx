import React from 'react'
import { UnlockLike, AdaptiveLearning, AffordablePricing, IndiaRanking, DetailedSolutions, Analytics } from '../../Core/Layout/Icon'

export default function TestExamFeatures() {
  return (
    <div className="test-exam-features">
      <div className="a-container">
        <div className="top-title">
          <h2>Exam</h2>
          <p>Our platform is constantly updated to make the online tests as realistic as the final exam</p>
        </div>
        <div className="cards-wrapper">
          <div className="card">
            <span className="icon"><UnlockLike /></span>
            <h4> Latest Patterns</h4>
            <p>Online Tests are designed keeping in mind the real exams' pattern and interface</p>
          </div>
          <div className="card">
            <span className="icon"><AdaptiveLearning /></span>
            <h4>Real-time exam environment</h4>
            <p>Online Tests are designed keeping in mind the real exams' pattern and interface</p>
          </div>
          <div className="card">
            <span className="icon"><AffordablePricing /></span>
            <h4>Designed by top faculties</h4>
            <p>All online tests are created by industry experts and top faculties from leading institutes. Moreover they go through a 3 step review process from Team Admisure</p>
          </div>
          <div className="card">
            <span className="icon"><IndiaRanking /></span>
            <h4>All India Rank and Scorecard</h4>
            <p>Evaluate your results with the ones across India and get a scorecard comparing your results with them.</p>
          </div>
          <div className="card">
            <span className="icon"><DetailedSolutions /></span>
            <h4>Detailed Performance Analysis</h4>
            <p>Compare yourself with the likes of the toppers and get customized comparison analysis, score cards and performance reports</p>
          </div>
          <div className="card">
            <span className="icon"><Analytics /></span>
            <h4>Detailed Solution</h4>
            <p>You can get in depth solution for each question available on the platform. This will help you in cracking your main exam.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
