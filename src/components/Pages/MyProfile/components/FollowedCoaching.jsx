import React, { useState } from 'react';
import { ToolTip } from './../../../Core/Layout/Tooltip/ToolTip';
import { Modal } from 'react-responsive-modal';
import { BASE_URL } from './../../../../config';
import axios from 'axios';
import { updateFollowings } from '../../../../redux/MyProfile/profile.actions';
import { useDispatch } from 'react-redux';
import { Link ,useHistory} from 'react-router-dom';




const FollowedCoaching = ({ item }) => {
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const history = useHistory();

  const dispatch = useDispatch();

  // For unfollowing and removing item
  const handleUnfollow = async (id) => {
    dispatch(updateFollowings(id));
    onCloseModal();

    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      coachingId: id,
    });
    try {
      const {
        data: { data },
      } = await axios.post(`${BASE_URL}/coaching/unfollow`, body, config);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const countFormat = (countItem) => (
    <React.Fragment>{countItem < 2 ? countItem : `${countItem - 1}+`}</React.Fragment>
  );




  return (
    <React.Fragment>
      <tr>
        <td>
          {item.logoUrl === null ? (
            <img onClick={() => history.push(`/coaching/${item.id}`)} style={{cursor:'pointer'}}
              src={`https://via.placeholder.com/40x40?text=${item.coachingName}`}
              alt=""
              className="follow-img"
            />
          ) : (
            <img src={item.logoUrl} alt="" className="follow-img" onClick={() => history.push(`/coaching/${item.id}`)} style={{cursor:'pointer'}}/>
          )}

          <div className="coaching-info" onClick={() => history.push(`/coaching/${item.id}`)} style={{cursor:'pointer'}}>
            <h5>{item.coachingName}</h5>
            <p>
              {item.state.name}, {item.city.city}
            </p>
          </div>
        </td>
        <td>
          {item.examTypes.length <= 2 ? (
            item.examTypes.map((i, idx) => (
              <React.Fragment key={idx}>
                {i.examType} {idx !== item.examTypes.length - 1 ? '& ' : ''}{' '}
              </React.Fragment>
            ))
          ) : (
            <div>
              {item.examTypes.slice(0, 2).map((i, idx) => (
                <React.Fragment key={idx}>
                  {i.examType}{' '}
                  {idx !== item.examTypes.slice(0, 2).length - 1 ? '& ' : ''}{' '}
                </React.Fragment>
              ))}

              <ToolTip
                message={`${item.examTypes.slice(2).map((el) => el.examType)}`}
                position={'top'}>
                <p>
                  {'+'}
                  {item.examTypes.slice(2).reduce((acc, current) => acc + 1, 0)}
                </p>
              </ToolTip>
            </div>
          )}
        </td>
        <td style={{ textAlign: 'center' }}> {countFormat(item?.testPackageCount)}</td>
        <td style={{ textAlign: 'center' }}>{item?.totalFollowers < 0 ? 0 : item.totalFollowers}</td>
        <td>
          <button className="btn-line" onClick={() => setOpen(true)}>
            Unfollow
          </button>
        </td>
      </tr>

      <Modal open={open} onClose={onCloseModal} center>
        <div className="language-modal">
          <p> Do you want to unfollow it? </p>
          <div className="language-btn">
            <button className="btn-no radius" onClick={() => onCloseModal()}>
              No
            </button>
            <button
              className="btn-primary radius"
              onClick={() => handleUnfollow(item.id)}>
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FollowedCoaching;
