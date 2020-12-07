import React from 'react';
import './MessageDisplay.scss';
import MessageItem from '../messageItem/MessageItem';

export default function MessageDisplay(props) {
    return (
        <div className="MessageContainer">
            <MessageItem mobile={props.mobile}/>
            <MessageItem mobile={props.mobile}/>
            <MessageItem mobile={props.mobile}/>
            <MessageItem mobile={props.mobile}/>
            <MessageItem mobile={props.mobile}/>
            <MessageItem mobile={props.mobile}/>
            <MessageItem mobile={props.mobile}/>
            <MessageItem mobile={props.mobile}/>

        </div>
    )
}
