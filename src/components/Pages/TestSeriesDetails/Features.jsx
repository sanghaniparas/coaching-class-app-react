import React from 'react';
import { CheckCircle } from '../../Core/Layout/Icon';

export default function Features() {
  return (
    <div className="features-wrapper">
      <h2>Features</h2>
      <div className="card">
        <h3>Why Take This Package</h3>
        <ul>
          <li>
            <CheckCircle /> Lorem ipsum doler sit amet Lorem ipsum doler sit
            amet
          </li>
          <li>
            <CheckCircle /> Lorem ipsum doler sit amet
          </li>
          <li>
            <CheckCircle /> Lorem ipsum doler
          </li>
          <li>
            <CheckCircle /> Lorem ipsum doler sit amet
          </li>
        </ul>
      </div>
    </div>
  );
}
