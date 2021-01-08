import React, { useContext, useState, useEffect } from "react";
import "./MessageDisplay.scss";
import MessageItem from "../messageItem/MessageItem";
import { UserContext } from "../../contexts/UserContext";
import { getData } from "../../tools/globalFunctions";
import { Spin } from "antd";

const MessageDisplay = (props) => {
  let params = {
    startIndex: 0,
    endIndex: 10,
    lastMessageDate: null,
  };

  const { user } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const chatResults = await getData(`api/chat/`, params, false);
    console.log(chatResults.data.data);
    setMessages(chatResults.data.data);
    console.log("the message are ", messages);
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="containerMainapp">
        <div className="loading">
          <Spin size="large" />
        </div>
      </div>
    );
  return (
    <div className="MessageContainer">
      {messages.map((element) => {
        return <MessageItem mobile={props.mobile} message={element} />;
      })}
    </div>
  );
};

export default MessageDisplay;
