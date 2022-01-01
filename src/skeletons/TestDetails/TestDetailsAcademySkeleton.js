import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TestDetailsAcademySkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div style={{ display: 'flex', width: '900px' }}>
        <div style={{ marginRight: '1rem' }}>
          <Skeleton height={100} width={100} />
        </div>
        <div>
          <p style={{ marginBottom: '10px' }}>
            <Skeleton height={20} width={500} />
          </p>
          <p style={{ marginBottom: '10px' }}>
            <Skeleton height={20} width={500} />
          </p>
          <p style={{ marginBottom: '10px' }}>
            <Skeleton height={20} width={500} />
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '-20px', padding: '1rem 0 0 0' }}>
        {[1, 2, 3, 4, 5].map((el) => (
          <span style={{ marginRight: '60px' }}>
            <Skeleton height={50} width={50} />
          </span>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default TestDetailsAcademySkeleton;
