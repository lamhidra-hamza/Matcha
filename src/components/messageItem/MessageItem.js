import React from 'react';
import { Divider } from 'antd';
import './MessageItem.scss';

export default function MessageItem() {
    return (
            <div>
                <div className="MessageItem">
                    <div className="avatarMessage">
                    <div className="MessageItemAvatar">
                        <img alt= "asdfads" className="MessageItemAvatarImg" src="https://vignette.wikia.nocookie.net/naruto/images/9/97/Hinata.png/revision/latest/scale-to-width-down/300?cb=20141010104729" />
                    </div>
                    <div className="MessageItemMessage">
                        <div className="userName">
                                Chiwahed
                        </div>
                        <div className="msgSnippets">
                                cc cv a hinata !?
                                msaliya gheda 
                        </div>
                   
                    </div>
                    </div>
                    <div className="msgItemSelected">
                    </div>
                </div>
                <Divider style={{ margin: '0px'}}/>
            </div>
                   
    )
}
