import React from 'react';
import {
  FacebookRound,
  SummaryReport,
  WhatsApp,
  GmailRound,
  TwitterIcon,
  FooterLinkedin,
} from '../../../../Core/Layout/Icon';
import PercentageCalculation from './PercentageCalculation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectQuizReport } from '../../../../../redux/quiz/quiz.selectors';
import Loader from 'react-loader-spinner';

const QuizSummaryReport = ({ report, match }) => {
  const site_url = 'https://admisure.com';
  const shareLink = {
    whatApp: 'whatApp',
    facebook: 'facebook',
    gmail: 'gmail',
  };
  console.log('match', match.url.split('/')[2]);
  console.log('match', match.url);
  const shareURL = (siteOption) => {
    let newWindow = '';
    switch (siteOption) {
      case shareLink.whatApp:
        newWindow = window.open(
          `https://web.whatsapp.com/send?text=${site_url}${match.url}`,
          '_blank',
          'test'
        );
        break;
      case shareLink.facebook:
        // https://www.facebook.com/share.php?u={site_url}
        newWindow = window.open(
          `https://www.facebook.com/share.php?u=${site_url}${match.url}`,
          '_blank',
          'test'
        );
        break;
      case shareLink.gmail:
        newWindow = window.open(
          `https://mail.google.com/mail/u/0/?view=cm&fs=1&to&body=${site_url}${match.url}`,
          '_blank',
          'test'
        );
        break;
      default:
        break;
    }
    if (newWindow) {
      //registerlinkShare();
      newWindow.opener = null;
    }
  };
  return (

    Object.keys(report).length === 0 ? 
      <div style={{ minHeight: '100vh' }}>
        <Loader
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          type="Oval"
          color="#FF7249"
          height={40}
          width={40}
          timeout={3000} //3 secs
        />
      </div>
      :
      <div className="summary-report half">
        <h2>Summary Reports</h2>
        <span className="summary-icon">
          <SummaryReport />
        </span>
        <div className="rank">
          <p>Your Rank</p>
          <h4>
            {report?.rank?.rank || 0}/{report?.rank?.total || 0}
          </h4>
        </div>
        <div className="percent-calculation">
          <PercentageCalculation />
        </div>

        
          <div className="share-summary" style={{cursor:"pointer"}}>
            Share with your friends!
            <div className="summary-social-icon">
              <span                
                onClick={() => shareURL(shareLink.whatApp)}>
                <WhatsApp />
              </span>
              <span                 
                onClick={() => shareURL(shareLink.facebook)}>
                <FacebookRound />
              </span>
              <span                
                onClick={() => shareURL(shareLink.gmail)}>
                <GmailRound />
              </span>
              <span>
                <FooterLinkedin fill="#0e76a8" />
              </span>
              <span>
                <TwitterIcon />
              </span> 

              {/* <CopyLinkRound /> */}
            </div>
          </div>
        
      </div>

    // Object.keys(report).length > 0 && (
    //   <div className="summary-report half">
    //     <h2>Summary Reports</h2>
    //     <span className="summary-icon">
    //       <SummaryReport />
    //     </span>
    //     <div className="rank">
    //       <p>Your Rank</p>
    //       <h4>
    //         {report.rank.rank}/{report.rank.total}
    //       </h4>
    //     </div>
    //     <div className="percent-calculation">
    //       <PercentageCalculation />
    //     </div>

    //     <div style={{ paddingTop: '2rem' }}>
    //       <span className="share">
    //         Share with your friends!
    //         <div className="toggle" style={{ textAlign: 'center' }}>
    //           <span
    //             style={{ marginRight: '0.8rem', cursor: 'pointer' }}
    //             onClick={() => shareURL(shareLink.whatApp)}>
    //             <WhatsApp />
    //           </span>
    //           <span
    //             style={{ marginRight: '0.8rem', cursor: 'pointer' }}
    //             onClick={() => shareURL(shareLink.facebook)}>
    //             <FacebookRound />
    //           </span>
    //           <span
    //             style={{ marginRight: '0.8rem', cursor: 'pointer' }}
    //             onClick={() => shareURL(shareLink.gmail)}>
    //             <GmailRound />
    //           </span>
    //           {/* <span style={{ marginRight: '0.8rem' }}>
    //             <TwitterIcon />
    //           </span> */}

    //           {/* <CopyLinkRound /> */}
    //         </div>
    //       </span>
    //     </div>
    //   </div>
    // )
  );
};

const mapStateToProps = createStructuredSelector({
  report: selectQuizReport,
});
export default connect(mapStateToProps)(QuizSummaryReport);
