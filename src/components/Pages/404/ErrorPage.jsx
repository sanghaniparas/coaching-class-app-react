import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="error-page-wrapper">
      <div className="info">
        <h1>Oops! Couldn't find this page</h1>
        <h2>
          4 <span>0</span> 4
        </h2>
        <Link to="/" className="btn-primary">
          Go back Home
        </Link>
      </div>
    </div>
  );
}
