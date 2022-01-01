import React from 'react';
import { useHistory } from 'react-router-dom';

export default function TestBanner({totalTestPackege}) {
  const history = useHistory();
  const goToHome = () => {
    history.push(`/`);
  }
  return (
    <div className="banner"  style={{
      backgroundImage: `url(${require(`../../../assets/images/Testseriespage.png`)})`,
    }}>
      <div className="a-container">
        <ul className="breadcrumb">
          <li onClick={() => goToHome()} style={{cursor: 'pointer'}}>Home</li>
          <li className="active">Test Series </li>
        </ul>
        <h2>All Test series packages</h2>
        <p>{totalTestPackege && totalTestPackege} Test series are available</p>
      </div>
    </div>
  );
}
