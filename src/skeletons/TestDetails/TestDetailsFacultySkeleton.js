import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TestDetailsFacultySkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div style={{ padding: '2rem 0' }}>
        <div>
          <Skeleton height={20} width={180} />
        </div>
        <div>
          <Skeleton height={20} width={180} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TestDetailsFacultySkeleton;
