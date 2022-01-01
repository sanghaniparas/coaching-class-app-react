import React, { useState, useEffect } from 'react';
import { AlarmClock, ModalClose } from '../../Core/Layout/Icon';
import { Modal } from '../../Core/Layout/Modal/Modal';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import {
  WhatsApp,
  TeleGramRound,
  FacebookRound,
  GmailRound,
  CopyLinkRound,
} from '../../Core/Layout/Icon';
import { BASE_URL } from './../../../config';
import Countdown from './Countdown';

const site_url = 'https://admisure.com/testdetails/';

const shareLink = {
  whatApp: 'whatApp',
  facebook: 'facebook',
  gmail: 'gmail',
};

export default function TestSeriesShare({
  shareCount,
  testDetails,
  registerlinkShare,
  match,
}) {
  const [pendindToShare, setPendingToShare] = useState(5);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [incomplete, setIncomplete] = useState([
    'Pending',
    'Pending',
    'Pending',
    'Pending',
    'Pending',
  ]);
  const { addToast } = useToasts();
  useEffect(() => {
    setIncomplete(['Pending', 'Pending', 'Pending', 'Pending', 'Pending']);
    setPendingToShare(5 - shareCount.length);
    setIncomplete(incomplete.splice(0, pendindToShare - shareCount.length));
  }, [shareCount]);
  const shareURL = (siteOption) => {
    let newWindow = '';
    switch (siteOption) {
      case shareLink.whatApp:
        newWindow = window.open(
          `https://web.whatsapp.com/send?text=${site_url}${match.params.id}`,
          '_blank',
          'test'
        );
        break;
      case shareLink.facebook:
        // https://www.facebook.com/share.php?u={site_url}
        newWindow = window.open(
          `https://www.facebook.com/share.php?u=${site_url}${match.params.id}`,
          '_blank',
          'test'
        );
        break;
      case shareLink.gmail:
        newWindow = window.open(
          `https://mail.google.com/mail/u/0/?view=cm&fs=1&to&body=${site_url}${match.params.id}`,
          '_blank',
          'test'
        );
        break;
      default:
        break;
    }
    if (newWindow) {
      registerlinkShare();
      newWindow.opener = null;
    }
  };
  const showShareModal = () => {
    //setShowSharePopup(true);
    shareURL(shareLink.whatApp);
  };
  const closeModal = () => {
    setShowSharePopup(false);
  };
  const packageUnlock = () => {
    addToast('Package Unlocked you can buy now', {
      appearance: 'success',
      autoDismiss: 'true',
      autoDismissTimeout: 3000,
    });
    window.scrollTo(0, 0);
  }
  console.log('shareCount', shareCount);
  return (
    <>
      {shareCount && (
        <div className="testseries-share card">
          <div className="share-left">
            <h3>SHARE SECTION</h3>
            <p className="info">
              Share your link with friends. When they visit website, you will be
              able to unlock this package.
            </p>
            <ul className="share-steps">
              {shareCount.length > 0 &&
                shareCount.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <li className="steps complete">
                      <span className="step">{idx + 1}</span>
                      <p>Completed</p>
                      <p className="date">
                        {moment(new Date(`${item.updatedAt}`)).format(
                          'MMMM Do YYYY'
                        )}
                      </p>
                    </li>
                    {idx < 4 && (
                      <li className="complete">
                        <span className="complete-tick"></span>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              {pendindToShare > 0 &&
                incomplete.map((item, idx) => (
                  <li className="steps pending" key={idx}>
                    <span className="step">{idx + 1 + shareCount.length}</span>
                    <p>{item}</p>
                  </li>
                ))}
            </ul>
          </div>
          <div className="share-right">
            <div className="share-screenshot">
              <p>This section needs share gif as stated in screenshots.</p>
            </div>
            {shareCount.length < 5 && (
              <button
                className="p-btn btn-primary"
                onClick={() => showShareModal()}>
                Share &amp; Unlock now
              </button>
            )}
            {shareCount.length >= 5 && (
              <button className="p-btn btn-primary" onClick={packageUnlock}>Package Unlocked</button>
            )}
            {testDetails?.testpackageDetails?.expireDate && (
              <p className="time">
                <AlarmClock fill="#e4556c" />
                <Countdown
                  timeTillDate={moment(
                    testDetails.testpackageDetails.expireDate
                  ).format('MM DD YYYY, h:mm a')}
                  timeFormat="MM DD YYYY, h:mm a"
                />
                {/* Expires in {moment(testDetails.testpackageDetails.expireDate).format('MMMM Do YYYY')} */}
              </p>
            )}
          </div>
        </div>
      )}
      {showSharePopup && (
        <Modal addClass="shareunlock-modal">
          <div className="modal-header">
            <span className="close" onClick={() => closeModal()}>
              <ModalClose />
            </span>
            <h2>Share And Unlock</h2>
          </div>
          <div className="a-wrapper pass-slider-wrapper">
            <div className="a-container">
              <div>
                <span onClick={() => shareURL(shareLink.whatApp)}>
                  <WhatsApp />
                </span>
                <span onClick={() => shareURL(shareLink.facebook)}>
                  <FacebookRound />
                </span>
                <span onClick={() => shareURL(shareLink.gmail)}>
                  <GmailRound />
                </span>
                {/* <span onClick={()=>shareURL(shareLink.gmail)}><TeleGramRound /></span> */}
                {/* <CopyLinkRound /> */}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
