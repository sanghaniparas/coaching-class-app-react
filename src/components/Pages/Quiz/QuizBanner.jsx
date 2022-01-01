import React from 'react';
import { useHistory } from 'react-router-dom';

export default function QuizBanner() {
  const history = useHistory();
  const goToHome = () => {
    history.push(`/`);
  }
  return (
    <div className="banner" style={{
      backgroundImage: `url(${require(`../../../assets/images/QuizPage.png`)})`,
    }}>
      <div className="a-container">
        <ul className="breadcrumb">
          <li onClick={() => goToHome()} style={{cursor: 'pointer'}}>Home</li>
          <li className="active">Quiz</li>
        </ul>
        <h2>Quizzes</h2>
      </div>
    </div>
  );
}
