import React from 'react';
import { Link } from 'react-router-dom';
import JsonLd from './../../../utils/JsonLd';

let data = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: 'https://admisure.com',
  logo: '../../../assets/images/logo.png',
};

const Logo = () => {
  return (
    <>
      <div className="a-header-logo">
        <Link to="/">
          <img
            src={require('../../../assets/images/betalogo.png')}
            alt="admisure"
          />
        </Link>
        <JsonLd data={JSON.stringify(data)} />
      </div>
    </>
  );
};

export default Logo;
