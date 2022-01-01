import React from 'react'

const PassGotAQuestion = () => {
    return (
        <div className="got-question">
            <div className="a-container">
                <div className="heading-part">
                    <h2>Got a Questions about Pass benefits?</h2>
                    <p>We are always there for you.</p>
                </div>
                <div className="got-question-form">
                    <ul>
                        <li>
                            <div className="field-box">
                                <label htmlFor="">Full Name</label>
                                <input type="text" className="text-field"/>
                            </div>
                            <div className="field-box">
                                <label htmlFor="">Phone Number</label>
                                <input type="text" className="text-field"/>
                            </div>
                            <div className="field-box">
                                <label htmlFor="">Email Address</label>
                                <input type="text" className="text-field"/>
                            </div>
                        </li>
                        <li>
                            <textarea name="" placeholder="Write message here..." id="" cols="30" rows="10"></textarea>
                        </li>
                    </ul>
                    <button class="btn-primary radius-30 question-send-btn">Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default PassGotAQuestion
