import React from 'react';
import { UnlockLike } from '../../Core/Layout/Icon';

export default function HowItWordks() {
  return (
    <div className="unlock-working howit-works">
      <div className="a-container">
        <h2>How it Works ?</h2>
        <p>Unlock the Pass and explore multiple premium test packages</p>
        <div className="share-steps">
          <ul>
            <li>
              <span className="share-steps-icon"><UnlockLike /></span>
              <h4>Choose a Pass</h4>
              <p>Choose a Pass based on the exam you are appearing for</p>
            </li>
            <li>
              <span className="share-steps-icon"><UnlockLike /></span>
              <h4>Make Payment</h4>
              <p>After you go through the online tests, make payment via preferable payment mode</p>
            </li>
            <li>
              <span className="share-steps-icon"><UnlockLike /></span>
              <h4> Unlock all the Tests</h4>
              <p>Unlock all premium tests packages and start accessing them.</p>
            </li>
            <li>
              <span className="share-steps-icon"><UnlockLike /></span>
              <h4>Access your Pass</h4>
              <p>Congratulations! You are now ready to access all the online premium Test Packages of your desired coaching.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
