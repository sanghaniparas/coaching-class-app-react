import React from 'react';

export default function CoachingDetailsTab({ sectionHome, sectionTestSeries, sectionPracticeSet, sectionQuizzes, setIsMainTab, isMainTab }) {

    return (
        <div className="a-wrapper a-coaching-bottom-nav">
            <div className="a-container">
                <ul className="a-tab-items">
                    <li
                        className={isMainTab === "home" ? "active" : ""}
                        onClick={() => sectionHome()}
                    ><span>Home</span></li>
                    <li
                        className={isMainTab === "testSeries" ? "active" : ""}
                        onClick={() => sectionTestSeries()}
                    ><span>Test Series</span></li>
                    <li
                        className={isMainTab === "practiceSet" ? "active" : ""}
                        onClick={() => sectionPracticeSet()}
                    ><span>Practice Sets</span></li>
                    <li
                        className={isMainTab === "quizzes" ? "active" : ""}
                        onClick={() => sectionQuizzes()}
                    ><span>Quizzes</span></li>
                    <li
                        className={isMainTab === "about" ? "active" : ""}
                        onClick={() => setIsMainTab("about")}
                    ><span>About</span></li>
                </ul>
            </div>
        </div>
    )
}


