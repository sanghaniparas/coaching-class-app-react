import React from 'react'

export default function PassQuestion() {
  return (
    <div className="pass-question">
      <div className="a-container">
        <div className="headerline">
          <h2>Got a Question About Pass Benefits?</h2>
          <p>We are always there for you.</p>
        </div>
        <div className="form-wrapper">
          <div className="form-top">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-bottom">
            <div className="form-group msg">
              <textarea name="" id="" placeholder="write message here..."></textarea>
            </div>
            <div className="form-group">
              <button className="btn-primary">Send Message</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
