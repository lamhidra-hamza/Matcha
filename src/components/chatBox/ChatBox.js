import React from 'react'
import { Avatar, Input, Button } from 'antd'
import './ChatBox.scss'
import MessageSent from '../messageSent/MessageSent'
import MessageReceived from '../messageReceived/MessageReceived'

export default function ChatBox() {
  return (
    <div className="chatBox">
      <div className="chatBoxHeader">
        <div className="avatar">
          <Avatar
            size={50}
            src="https://static01.nyt.com/images/2020/01/13/arts/13billboard-item/13billboard-item-superJumbo.jpg"
          />
        </div>
        <div className="matchDate">You matched with Hinata on 50/50/3020</div>
      </div>
      <div className="chatBoxbody">
        <MessageSent />

        <MessageReceived />

        <MessageSent />

        <MessageReceived />

        <MessageSent />

        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
      </div>
      <div className="chatBoxInput">
        <div className="chatInput">
          <Input
            placeholder="Type a message"
            style={{
              height: '4vh',
              borderRadius: '10px',
            }}
          />
        </div>
        <div className="chatButton">
          <Button shape="round" className={'sentBtn'}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
