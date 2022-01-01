import React, { useState, useEffect } from 'react';
import { BookMark, LineArrow } from '../../../Core/Layout/Icon';
import Accordion from '../../../Pages/Elements/Accordion';
import ReactHtmlParser from 'react-html-parser';
export const QuestionList = (props) => {
    console.log('props ==> ', props);
    const accordianSubject = (bookMark, bookMarkIndex, chapter, practiceQuestionIndex, chapterIndex, reportTypes) => {
        console.log('practiceQuestionIndex ==> ', practiceQuestionIndex);
        console.log('chapterIndex ==> ', chapterIndex);
        console.log('bookMarkIndex ==> ', bookMarkIndex);
        console.log('props.showReportSection ==> ', props.showReportSection);
        return (
            <div className="accordion-content-div" key={bookMarkIndex}>
                <p className={`content-header-text`}>
                    <span>{bookMark.quesPosition} of {chapter.chapterQuestionCount}</span>
                    <span>{bookMark.practiceSetName}</span>
                </p>
                <p className="act-btn" onClick={() => props.handleBookmark(bookMark.id, props.typeId)}>
                    <BookMark fill={'#fd8041'} />
                    Saved
                </p>
                
                <p className={`report-btn`} onClick={() => props.reportHandle(props.type, practiceQuestionIndex, chapterIndex, bookMarkIndex)}>
                    {props.showReportSection[practiceQuestionIndex][chapterIndex][bookMarkIndex] && 
                    <div className={`report-div`}>
                        <ul>
                            {reportTypes.length &&
                                reportTypes.map((el) => (
                                    <li id={el.id} onClick={(e) => props.reportModalOpen(e, bookMark.practiceSetQuestionId, bookMark.practiceSetResultId)}>
                                        {el.name}
                                    </li>
                            ))}
                        </ul>
                    </div>
                    }
                </p>
                <div className={`accordian-desc`}>{ReactHtmlParser(bookMark.question)}</div>
            </div>
        )
    }
    return (
        <div className={`item-wrap ${props.dataToggle[props.keyIndex] ? 'open' : ''}`} key={props.keyIndex}>
            <div className="items card" onClick={() => props.handleArroowToggle(props.keyIndex, !props.dataToggle[props.keyIndex], props.type)}>
                <div className="left-info">
                    <h3 className="title">{props.data.subject}</h3>
                    <span className="label">{props.data.chapters.length} {props.data.chapters.length>1?'Chapters':'Chapter'}</span>
                    <span className="label">{props.dataQuestionArr[props.keyIndex]} {props.dataQuestionArr[props.keyIndex] > 1?'Questions':'Question'}</span>
                </div>
                <div className="right-info">
                    <span>{props.latestBookmarkData[props.keyIndex]} <i style={{cursor: 'pointer'}} /*onClick={() => handleArroowToggle(practiceQuestionIndex, !accordianObj.practiceDataToggle[practiceQuestionIndex], 'practice')}*/><LineArrow /></i></span>
                </div>
            </div>
            <div className={`item-dropdown ${props.dataToggle[props.keyIndex] ? 'active' : ''}`}>
                {
                    props.data.chapters.length && (
                        <div className={`a-accordian`}>
                            <div className="a-container">
                                {
                                    props.data.chapters.map((chapter, idx) => (
                                        <div className="a-wrapper" key={idx}>
                                            <div className="a-faqwrap">
                                                <Accordion key={idx} title={chapter.chapter} question={`${chapter.bookmarkData.length} Questions`}>
                                                    {
                                                        chapter.bookmarkData.length && chapter.bookmarkData.map((bookMark, bookMarkIndex) => (
                                                            accordianSubject(bookMark, bookMarkIndex, chapter, props.keyIndex, idx, props.reportTypes)
                                                        ))
                                                    }
                                                </Accordion>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}