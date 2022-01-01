import React, { useState } from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { ModalClose, Info, CheckCircle, CloseCircle, BookMark } from '../../Core/Layout/Icon';
import { Modal } from '../../Core/Layout/Modal/Modal';


export default function QuizDetails() {
  const [toggleModal, settoggleModal] = useState(false)
  const [reportToggle, setreportToggle] = useState(false)

  const reportToggleHandler = () => {
    setreportToggle(!reportToggle)
  }

  const modaToggleHandler = () => {
    settoggleModal(!toggleModal)
  }
  const modalCloseHandler = () => {
    settoggleModal(false)
  }
  return (
    <div className="quiz-wrapper">
      <div className="quiz-header">
        <div className="quiz-header-left">
          <img src={require('../../../assets/images/sbi-logo.png')} alt="" className="quiz-header-logo" />
          <div className="content">
            <h2>Bank Po Quiz</h2>
            <p>Railway &amp; Banking | By Asian Academy</p>
          </div>
        </div>
        <div className="quiz-header-right">
          <div className="time">
            <h5>120 Mins</h5>
            <p>Total Time</p>
          </div>
          <div className="time-left">

            <CircularProgressbarWithChildren
              value={66}
              strokeWidth={5}
              styles={buildStyles({
                pathColor: "#ff5d6d"
              })}
            >
              <div className="progress-bar-percent">
                <strong>2:15</strong>
                <p>Time Left</p>
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div className="close">
            <ModalClose fill="#fff" />
          </div>
        </div>
      </div>
      <div className="quiz-body-container">
        <div className="a-container">
          <div className="quiz-header-group">
            <h2 className="quiz-heading">Question 2 of 100 </h2>
            <div className="quiz-filter">
              <p className="save">
                <BookMark /> Save
              </p>
              <p className="report" onClick={reportToggleHandler}>
                <Info />
                Report
                {reportToggle && <div className="report-dropdown">
                  <ul>
                    <li>Incorrect Question</li>
                    <li>Incorrect Answer</li>
                    <li>Formatting Issue</li>
                    <li>No Solution</li>
                    <li>Others</li>
                  </ul>
                </div>}
              </p>

            </div>
          </div>
          <div className="quiz-card-wrapper">
            <div className="qst-card quiz">
              <strong>Q.2</strong><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci id dolore recusandae quod temporibus doloribus ad optio saepe architecto! Cumque, aut. Error, officiis! Dicta ab, praesentium molestiae optio consequuntur repellat!</p>
            </div>
            <div className="qst-card success">
              <div className="qst-left">
                <span className="ans-number">A</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="qst-right">
                <CheckCircle /> Correct Answer
              </div>
            </div>
            <div className="qst-card error">
              <div className="qst-left">
                <span className="ans-number">A</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="qst-right">
                <CloseCircle /> Incorrect
              </div>
            </div>
            <div className="qst-card">
              <span className="ans-number">C</span>
              <p>Lorem ipsum dolor sit</p>
            </div>
            <div className="qst-card">
              <span className="ans-number">D</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="qst-card">
              <span className="ans-number">D</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="qst-card">
              <span className="ans-number">D</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="qst-card">
              <span className="ans-number">D</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="qst-card">
              <span className="ans-number">D</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="qst-card quiz solution">
              <div className="solution-header">
                <h5>Solution: B</h5>
                <p className="report">
                  <Info /> Report
               </p>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit autem explicabo voluptates corporis possimus corrupti asperiores culpa exercitationem, laudantium, animi quo voluptate alias impedit totam hic id! Nostrum, ducimus.</p>
            </div>
          </div>
          <div className="btn-group">
            <button className="btn-warning-line">Previous</button>
            <button className="btn-warning-line">Next</button>
          </div>
        </div>
      </div>
      <div className="quiz-footer">
        <div className="left-container">
          <div className="ans-type">
            <p className="ans">Answered </p>
            <p className="unans">Unanswered</p>
            <p className="notseen">Not Seen</p>
          </div>
          <ul className="list">
            <li>1</li>
            <li className="red-bg">2</li>
            <li>3</li>
            <li className="lightblue-bg">4</li>
            <li>5</li>
            <li>6</li>
            <li className="green-bg">7</li>
            <li>8</li>
            <li className="red-bg">9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li className="lightblue-bg">14</li>
            <li>15</li>
            <li>16</li>
            <li className="green-bg">17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>&gt;</li>
          </ul>

          <span className="viewAll" onClick={modaToggleHandler}>View All Questions</span>
        </div>
        <button className="btn-primary">Submit Quiz</button>
      </div>
      {toggleModal && <Modal addClass="analysis-modal">
        <div className="modal-header">
          <h3>All Questions Analysis</h3>
          <span className="close" onClick={modalCloseHandler}>
            <ModalClose />
          </span>
        </div>
        <div className="modal-body">
          <ul className="analysis-item">
            <li>1</li>
            <li className="green-bg">2</li>
            <li>3</li>
            <li className="dark-blue-bg">4</li>
            <li>5</li>
            <li>6</li>
            <li className="red-bg">7</li>
            <li className="dark-blue-bg">8</li>
            <li className="green-bg">9</li>
            <li>10</li>
            <li>11</li>
            <li className="red-bg">12</li>
            <li className="dark-blue-bg">13</li>
            <li className="green-bg">14</li>
            <li>15</li>
            <li>16</li>
            <li className="red-bg">17</li>
            <li>18</li>
            <li className="dark-blue-bg">19</li>
            <li>20</li>
          </ul>
          <div className="ans-type">
            <p className="ans">Answered (3)</p>
            <p className="unans">Unanswered (3)</p>
            <p className="notseen">Not Seen (3)</p>
          </div>
        </div>
      </Modal>}
    </div>
  )
}
