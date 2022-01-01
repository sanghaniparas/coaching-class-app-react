import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TestDetailsReviewSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div style={{ padding: '2.2rem' }}>
        <Skeleton height={70} width={300} />
        {'   '}
        <Skeleton height={70} width={300} />
        {'   '}
        <Skeleton height={70} width={300} />
        {'   '}
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <Skeleton circle={true} height={90} width={90} />
        <div style={{ marginLeft: '20px' }}>
          <p>
            <Skeleton height={25} width={400} />
          </p>
          <p>
            <Skeleton height={25} width={400} />
          </p>
          <p>
            <Skeleton height={25} width={400} />
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TestDetailsReviewSkeleton;
