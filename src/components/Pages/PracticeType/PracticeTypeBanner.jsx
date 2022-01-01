import React from 'react';
import { useHistory } from 'react-router-dom';

export default function PracticeTypeBanner() {
  const history = useHistory();
  const goToHome = () => {
    history.push(`/`);
  }
  return (
    <div className="banner" style={{
      backgroundImage: `url(${require(`../../../assets/images/PracticePage.png`)})`,
    }}>
      <div className="a-container">
        <ul className="breadcrumb">
          <li onClick={() => goToHome()} style={{cursor: 'pointer'}}>Home</li>
          <li className="active">Practice</li>
        </ul>
        <h2>Practice</h2>
      </div>
    </div>
  );
}
