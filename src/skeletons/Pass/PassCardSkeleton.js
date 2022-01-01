import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const PassCardSkeleton = () => {
  return (
    <div style={{ padding: '4rem', width: '1200px', margin: 'auto' }}>
      <SkeletonTheme color="#ddd">
        <span style={{ marginRight: '10px' }}>
          <Skeleton width={350} height={180} />
        </span>
        {'   '}
        <span style={{ marginRight: '10px' }}>
          <Skeleton width={350} height={180} />
        </span>
        {'   '}
        <span style={{ marginRight: '10px' }}>
          <Skeleton width={350} height={180} />
        </span>
      </SkeletonTheme>
    </div>
  );
};

export default PassCardSkeleton;
