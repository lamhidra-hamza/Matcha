import React, { useEffect } from "react";
import { Divider, Badge, message } from "antd";
import "./MessageItem.scss";
import { useHistory, useRouteMatch } from "react-router-dom";

const MessageItem = (props) => {
  let match = useRouteMatch();
  let history = useHistory();

  const handelClick = () => {
    history.push({
      pathname:
        match.path === "/app"
          ? `${match.path}/messages/chatbox/${props.message.chat_id}`
          : `${match.path}/chatbox`,
      state: {
        mobileKey: "4",
        desKey: "2",
        mobile: props.mobile,
      },
    });
  };

  return (
    <div onClick={handelClick}>
      <div className="MessageItem">
        <div className="avatarMessage">
          <div className="MessageItemAvatar">
              <img
                alt={props.message.username}
                className="MessageItemAvatarImg"
                src={props.message.picture_1}
              />
          </div>
          <div className="MessageItemMessage">
            <div className="userName">{props.message.username}</div>
            <div className="msgSnippets">{props.message.content}</div>
          </div>
        </div>
        <div className="msgItemSelected"></div>
      </div>
      <Divider style={{ margin: "0px" }} />
    </div>
  );
};

export default MessageItem;
