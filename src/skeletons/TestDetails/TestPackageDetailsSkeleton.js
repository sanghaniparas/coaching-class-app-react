import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TestPackageDetailsSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div>
        <Skeleton height={40} width={160} />
        {'     '}
        <Skeleton height={40} width={160} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Skeleton height={40} width={80} />
        {'     '}
        <Skeleton height={40} width={80} />
        {'    '}
        <Skeleton height={40} width={80} />
      </div>
    </SkeletonTheme>
  );
};

export default TestPackageDetailsSkeleton;
