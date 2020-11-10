import React from 'react'
import './MessageReceived.scss'

export default function messageReceived() {
    return (
        <div>
            <div className="messageReceived">
          <div className="messageReceivedContent">
            <span>test test test test</span>
          </div>          
        </div>
        <div className="messageReceivedInfo">
          <div className="messageReceivedTime">
            <span>12:56</span>
          </div>          
        </div>
        </div>
    )
}
