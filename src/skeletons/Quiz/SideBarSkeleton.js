import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SideBarSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div style={{ padding: '2rem', backgroundColor: '#FBF2EE' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton width={140} height={30} />
          <Skeleton width={200} height={30} />
        </div>
        <div style={{ marginTop: '3rem' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map((el) => (
            <p style={{ margin: '0.8rem 0' }}>
              <Skeleton width={200} height={20} />
            </p>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SideBarSkeleton;
