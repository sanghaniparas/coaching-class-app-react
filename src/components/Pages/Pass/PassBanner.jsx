import React, { useState, useEffect } from 'react';

export default function PassBanner({ recommendedPass, searchPassList }) {
  const [passItems, setPassItems] = useState('');
  useEffect(() => {
    if (searchPassList && searchPassList.length > 0) {
      setPassItems(searchPassList);
    } else {
      setPassItems(recommendedPass);
    }
  }, [recommendedPass, searchPassList]);
  return (
    <div className="banner" style={{
      backgroundImage: `url(${require(`../../../assets/images/Passpage.png`)})`,
    }}>
      <div className="a-container">
        <ul className="breadcrumb">
          <li>
            {' '}
            <a href="/">Home</a>{' '}
          </li>
          <li className="active">Pass</li>
        </ul>
        <h2>Membership Plan</h2>
        <p>{passItems?.length} Passes are available</p>
      </div>
    </div>
  );
}
