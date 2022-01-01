import React, { Fragment } from 'react';
import { CheckCircle, CloseCircle, Video } from '../../../../Core/Layout/Icon';

const ViewSolutions = () => {
  return (
    <Fragment>
      <div className="view-container-left">
        <h3 className="subject-title">Direction of Question [3 - 7]</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
          rerum, neque consectetur magni distinctio optio? Perspiciatis
          distinctio eveniet at voluptatum tenetur quo quis praesentium labore
          architecto sunt, obcaecati quos repellat? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Corrupti rerum, neque consectetur magni
          distinctio optio? Perspiciatis distinctio eveniet at voluptatum
          tenetur quo quis praesentium labore architecto sunt, obcaecati quos
          repellat?Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Corrupti rerum, neque consectetur magni distinctio optio?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
          rerum, neque consectetur{' '}
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
          rerum, neque consectetur magni distinctio optio? Perspiciatis
          distinctio eveniet at voluptatum tenetur quo quis praesentium labore
          architecto sunt, obcaecati quos repellat? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Corrupti rerum, neque consectetur magni
          distinctio optio? Perspiciatis distinctio eveniet at voluptatum
          tenetur quo quis praesentium labore architecto sunt, obcaecati quos
          repellat?Lorem ipsum,{' '}
        </p>
      </div>
      <div className="view-container-right">
        <div className="grey-bg-box question-box">
          <p>
            <span>Q.4</span> Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Corrupti rerum, neque consectetur{' '}
          </p>
        </div>
        <div className="solution-item success">
          <div className="left-info">
            <p>
              <span>A</span> (3,12,14)
            </p>
          </div>
          <div className="right-info">
            <span>
              60% answered correctly <CheckCircle />{' '}
            </span>
          </div>
        </div>
        <div className="solution-item">
          <div className="left-info">
            <p>
              <span>B</span> (3,12,14)
            </p>
          </div>
        </div>
        <div className="solution-item error">
          <div className="left-info">
            <p>
              <span>c</span> (3,12,14)
            </p>
          </div>
          <div className="right-info">
            <span>
              Incorrect <CloseCircle />{' '}
            </span>
          </div>
        </div>

        <div className="grey-bg-box solution">
          <h3>
            Solution: A{' '}
            <span>
              Watch Video <Video />
            </span>
          </h3>
          <p>1&#41; &#40;3, 12, 14&#41; &rarr; 3 x 4 = 12; 3 x 3 + 1 = 10</p>
          <p>1&#41; &#40;3, 12, 14&#41; &rarr; 3 x 4 = 12; 3 x 3 + 1 = 10</p>
          <p>1&#41; &#40;3, 12, 14&#41; &rarr; 3 x 4 = 12; 3 x 3 + 1 = 10</p>
          <p>1&#41; &#40;3, 12, 14&#41; &rarr; 3 x 4 = 12; 3 x 3 + 1 = 10</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewSolutions;
