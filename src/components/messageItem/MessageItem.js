import React from "react";
import { Divider, Badge} from "antd";
import "./MessageItem.scss";
import { useHistory, useRouteMatch } from "react-router-dom";
import { SER } from "../../conf/config";
import { postData } from "../../tools/globalFunctions";

const MessageItem = (props) => {
  const id = localStorage.getItem("userId");

  let match = useRouteMatch();
  let history = useHistory();

  const handelClick = async () => {
    props.seen(props.message.chat_id);
    if (props.message.seen === 0 && props.message.sender_id !== id)
      await postData(`api/chat/markseen/${props.message.messageId}`, {});
    history.push({
      pathname:
        match.path === "/app"
          ? `${match.path}/messages/chatbox/${props.message.chat_id}`
          : `${match.path}/chatbox/${props.message.chat_id}`,
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
          <Badge count = {(props.message.seen === 0 && props.message.sender_id !== id) ? 1: ""} style={{ margin: "1.5px 17px"}}>
            <div className="MessageItemAvatar">
              <img
                alt={props.message.username}
                className="MessageItemAvatarImg"
                src={`${SER.PicPath}/${props.message.picture_1}`}
              />
            </div>
          </Badge>
          <div className="MessageItemMessage">
            <div className="userName">{props.message.username}</div>
            <div className="msgSnippets">{props.message.content.substring(0, 30)}</div>
          </div>
        </div>
        <div className="msgItemSelected"></div>
      </div>
      <Divider style={{ margin: "0px" }} />
    </div>
  );
};

export default MessageItem;
