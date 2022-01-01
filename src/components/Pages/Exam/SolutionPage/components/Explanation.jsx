import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalClose, Video } from '../../../../Core/Layout/Icon';
import ReactMarkdown from 'react-markdown/with-html';
import { Modal } from '../../../../Core/Layout/Modal/Modal';

const Explanation = ({ singleQuestion }) => {
  const [videoToggle, setVideoToggle] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [videoModal, setVideoModal] = useState(false);
  const openVideoModal = () => {
    setVideoModal(!videoModal);
  };
  const closeVideoModal = () => {
    setVideoModal(false);
  };

  useEffect(() => {
	  if(singleQuestion && singleQuestion.solutionUrl) {
		  function getId(url) {
			const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
			const match = url.match(regExp);
	  
			return match && match[2].length === 11 ? match[2] : null;
		  }
		  const id = getId(singleQuestion.solutionUrl);
		  setVideoId(id);
	  }
  }, [singleQuestion]);

  /**
   * To close ta iframe
   */
  const closeIframe = () => {
    let ysrc = document.getElementById('videoIframe').src;
    let newsrc = ysrc.replace('&autoplay=1', '');
    document.getElementById('videoIframe').src = newsrc;
  };

  return (
    <div className="grey-bg-box solution">
      <h3>
        Solution:
        <span
          onClick={() => {
            openVideoModal();
            setVideoToggle(!videoToggle);
          }}>
          {videoModal && (
            <Modal addClass="video-modal modal-sm">
              <div className="video-modal-container">
                <div className="modal-header">
                  <h2 className="header">Solution Video</h2>
                  <span className="close" onClick={closeVideoModal}><ModalClose /></span>
                </div>
                <div className="modal-body">
                  <iframe
                    id="videoIframe"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1&autoplay=1&vq=hd1080&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1`}
                    width=""
                    height=""
                    frameborder="0"></iframe>
                </div>
              </div>

            </Modal>
          )}

        
          {!videoToggle && singleQuestion && singleQuestion.solutionUrl ? (
            <>
              <strong>Watch Video</strong>
              <Video />
            </>
          ) : (
              <div>
                {/* <strong>Close Video </strong>
              <i
                style={{
                  padding: '10px',
                  background: 'rgb(255, 114, 73)',
                  borderRadius: '100%',
                  color: 'white',
                  fill: 'rgb(255, 114, 73)',
                  marginLeft: '5px',
                  fontWeight: 'bold',
                }}
                class="fas fa-video-slash"></i> */}
              </div>
            )}
        </span>
      </h3>

      <ReactMarkdown source={singleQuestion.solution.replace(/&nbsp;|<p[^>]*>(?:\s|&nbsp;)*<\/p>/ig, '').trim()} escapeHtml={false} />
      {/* <p>1&#41; &#40;3, 12, 14&#41; &rarr; 3 x 4 = 12; 3 x 3 + 1 = 10</p>
      <p>1&#41; &#40;3, 12, 14&#41; &rarr; 3 x 4 = 12; 3 x 3 + 1 = 10</p>
      <p>1&#41; &#40;3, 12, 14&#41; &rarr; 3 x 4 = 12; 3 x 3 + 1 = 10</p>
      <p>1&#41; &#40;3, 12, 14&#41; &rarr; 3 x 4 = 12; 3 x 3 + 1 = 10</p> */}
    </div>
  );
};

export default Explanation;
