import React, {useContext} from "react";
import { Divider, Badge, message} from "antd";
import "./MessageItem.scss";
import { useHistory, useRouteMatch } from "react-router-dom";
import { SER } from "../../conf/config";
import { postData } from "../../tools/globalFunctions";
import { FireFilled, ClockCircleOutlined } from '@ant-design/icons';
import { UserContext } from "../../contexts/UserContext";

const MessageItem = (props) => {
  const id = localStorage.getItem("userId");
  const { onlineUser} = useContext(UserContext);

  let match = useRouteMatch();
  let history = useHistory();

  const onLineIcon = <FireFilled style={{ color: 'rgb(82, 196, 26)', fontSize:'20px' }} />;
  const offLine = <ClockCircleOutlined style={{ color: '#f5222d' }} />

  const handelClick = async () => {
    props.seen(props.message.chat_id);
    try {
      if (props.message.seen === 0 && props.message.sender_id !== id)
        await postData(`api/chat/markseen/${props.message.messageId}`, {});
    } catch (err) {
      message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
    }
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
  
  console.log("online User ===>>>", onlineUser);

  return (
    <div onClick={handelClick}>
      <div className="MessageItem">
        <div className="avatarMessage">
          <Badge count = {(props.message.seen === 0 && props.message.sender_id !== id) ? 1 : 
              onlineUser[props.message.user_id] ? onLineIcon : offLine} offset={[2, 3]}
              color={onlineUser[props.message.user_id] ? "green" : ""}
              >
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
            <div className="msgSnippets">last connection: 00:00</div>

            
          </div>
        </div>
        <div className="msgItemSelected"></div>
      </div>
      <Divider style={{ margin: "0px" }} />
    </div>
  );
};

export default MessageItem;
