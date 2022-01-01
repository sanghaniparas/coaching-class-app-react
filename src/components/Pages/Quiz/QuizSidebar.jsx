import React from 'react'
import { ExamTypeIcon, ModalClose, Subject } from '../../Core/Layout/Icon';
import CustomDropdownRadio from '../Elements/CustomDropdownRadio';
import CustomDropdownCheckbox from '../Elements/CustomDropdownCheckbox';
//import Layout from '../../Core/Layout/Layout';


export default function QuizSidebar({ examTypeListing, examNameListing, subjectListing, selectedSubject, filterExamType, filterExamName, filterClose }) {

  return (
    <aside className="quiz-sidebar grey-bg-box">
      <span className="close-sidebar" onClick={filterClose}><ModalClose /></span>
      <h3><ExamTypeIcon /> Exam Type</h3>
      <div className="form-group">
        <CustomDropdownCheckbox
          itemList={examTypeListing}
          respondSelectedItem={filterExamType}
          keyItem={'examType'}
          type={'examType'}
        />
      </div>
      <h3><Subject /> Subject</h3>
      <div className="option-list">
        <ul>
          {subjectListing && subjectListing.map((item, id) => (
            <li key={id}>
              <span className="custom-radio">
                <input type="radio" name="quiz-subject" id={item.id} onChange={(event) => selectedSubject(event)} />
                <label htmlFor={item.id}>{item.subject}</label>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
