import React from 'react';
import './MessageDisplay.scss';
import MessageItem from '../messageItem/MessageItem';

export default function MessageDisplay() {
    return (
        <div className="MessageContainer">
           <MessageItem />
            <MessageItem />
           <MessageItem />
           <MessageItem />
           <MessageItem />
           <MessageItem />
           <MessageItem />
           <MessageItem />

        </div>
    )
}
