import React, { useEffect, useState } from 'react';
import { UnlockLike } from '../../../Core/Layout/Icon';
import ShareUnlockSkeleton from './../../../../skeletons/ShareUnlockSkeleton';

export default function ShareAndUnloack() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timing);
  }, []);

  return loading ? (
    <ShareUnlockSkeleton />
  ) : (
    <div className="unlock-working">
      <div className="a-container">
        <h2>Share and unlock working</h2>
        <p>how share to unlock works?</p>
        <div className="share-steps">
          <ul>
            <li>
              <span className="share-steps-icon">
                <UnlockLike />
              </span>
              <h4>Browse Packages</h4>
              <p>
              For choosing the Share and Unlock discount, browse the numerous list of packages and select it.

              </p>
            </li>
            <li>
              <span className="share-steps-icon">
                <UnlockLike />
              </span>
              <h4>Share your package</h4>
              <p>
              Share the selected package with at least 5 people in your family or friends circle.

              </p>
            </li>
            <li>
              <span className="share-steps-icon">
                <UnlockLike />
              </span>
              <h4>Enroll yourself in the package</h4>
              <p>
              After you complete sharing, register yourself by clicking on the Unlock Now button
              </p>
            </li>
            <li>
              <span className="share-steps-icon">
                <UnlockLike />
              </span>
              <h4> Avail your package</h4>
              <p>
              You would be allowed to view the package for a stipulated period. You can avail discounts from this stage for the next packages.

              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
