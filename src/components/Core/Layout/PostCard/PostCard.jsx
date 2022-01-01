import React from 'react';
import moment from 'moment';
import { momentDurationFormatSetup } from 'moment-duration-format';

export const PostCard = ({ item }) => {
  console.log("iteem ***", item);

  return (

    <div className="post-card" style={{
      cursor: 'pointer',
    }}>

      <a href={item.url} target="_blank">
        <div className="post-card-img">
          {item.url ? (<img src={item.imageUrl} alt="" />) : (
            <img src="https://via.placeholder.com/272x150?text=NO IMAGE" alt="" />
          )}

        </div>
        <div className="post-body">
          <h4 className="post-title">{item.postName}</h4>
          <div className="post-avatar-info">
            <img
              src={require('../../../../assets/images/no-image-icon-md.png')}
              alt=""
              className="avatar-img"
            />
            <p className="avatar-name">{item.author_name}</p>
          </div>
          <p className="post-publish">
            Published On:{' '}
            <span>
              {moment(new Date(`${item.publish_date}`)).format('MMMM Do YYYY')}
            </span>
          </p>
        </div>
      </a>
    </div>
  );
};
