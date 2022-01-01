import React from 'react';
import { Layout } from '../Layout/Layout';

export const Messages = () => {
    return (
        <Layout>
            <div className="a-messages">
                <div className="a-msg-left">
                    <h4>Inbox (2)</h4>
                    <div className="a-msg-search">
                        <input type="text" placeholder="Search coaching and message" />
                        <button><img src={require('../../../assets/images/search.svg')} alt="search" /></button>
                    </div>
                    <div className="a-msg-list">
                        <ul>
                            <li>
                                <span></span>
                                <div className="a-msg-avatar">
                                    <b>Admisure Supports <span>10:24 AM</span></b>
                                    <p>Ask any for help</p>
                                    
                                </div>
                            </li>
                            <li>
                                <span></span>
                                <div className="a-msg-avatar">
                                    <b>IIt Institute, Kanpur <span>10:24 AM</span></b>
                                    <p>Ask any for help</p>
                                    
                                </div>
                            </li>
                            <li>
                                <span></span>
                                <div className="a-msg-avatar">
                                    <b>Torrent Institute, Rajstan <span>10:24 AM</span></b>
                                    <p>Ask any for help</p>
                                    
                                </div>
                            </li>
                            <li>
                                <span></span>
                                <div className="a-msg-avatar">
                                    <b>Asian Academy, Patna <span>10:24 AM</span></b>
                                    <p>Ask any for help</p>
                                    
                                </div>
                            </li>
                            <li>
                                <span></span>
                                <div className="a-msg-avatar">
                                    <b>Akash Institute, Delhi <span>10:24 AM</span></b>
                                    <p>Ask any for help</p>
                                    
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="a-msg-right">
                    
                </div>
            </div>
        </Layout>
    )
}
