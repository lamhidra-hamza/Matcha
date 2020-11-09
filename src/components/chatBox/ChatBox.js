import React from 'react'
import { Avatar, Input, Button } from 'antd'
import './ChatBox.scss';

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
              <div className="matchDate">
                You matched with Hinata on 50/50/3020
              </div>
            </div>
            <div className="chatBoxbody">
        
            </div>
            <div className="chatBoxInput">
              <div className="chatInput">
                <Input
                  placeholder="Type a message"
                  style={{
                    margin: '10px',
                    height: '50px',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div className="chatButton">
                <Button shape="round" className={'registerbtn'}>
                  send
                </Button>
              </div>
            </div>
          </div>
    )
}