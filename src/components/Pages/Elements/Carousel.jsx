import React from 'react';
import { Link } from 'react-router-dom';

export default function Carousel({ heading, subheader, title,children }) {
  return (
    <div className="a-carousel-wrapper">
      <h2 style={{fontSize: '25px',fontWeight: '800'}}>{heading}</h2>
      {subheader && <p>{subheader}</p>}
      {title && <Link to='/coaching-pass' className="test-title">{title}</Link>}
      <div className="a-carousel-inner">{children}</div>
    </div>
  );
}
