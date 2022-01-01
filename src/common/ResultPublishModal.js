import ReactFacebookLogin from 'react-facebook-login'
import { Modal } from '../components/Core/Layout/Modal/Modal'


import React from 'react'

const ResultPublishModal = ({ text, setModalShow }) => {
    return (
        < Modal addClass="enrolled-modal" >
            <div className="enrolled-success">
                <img
                    src={require('../assets/images/ArrowVerified.svg')}
                    alt="verify"
                />
                <h2></h2>
                <p>
                    {/* Your Result Are Not Published  Yet{' '} */}
                    {text}
                </p>

                <button
                    className="p-btn btn-primary"
                    onClick={() => setModalShow(false)}>
                    Close
            </button>
            </div>
        </Modal >
    )
}

export default ResultPublishModal

