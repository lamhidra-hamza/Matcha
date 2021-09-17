import React, { useEffect, useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Input, Button, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "./ChatBox.scss";
import MessageSent from "../messageSent/MessageSent";
import MessageReceived from "../messageReceived/MessageReceived";
import axios from "axios";
import { io } from "socket.io-client";
import { UserContext } from "../../contexts/UserContext";
import { getData, postData } from "../../tools/globalFunctions";
import { useParams } from "react-router-dom";
import { SER } from "../../conf/config";
import InfiniteScroll from "react-infinite-scroll-component";

var socket = io("http://localhost:8000", {
  withCredentials: true,
  extraHeaders: {
    token: "the real token is ",
  },
});

const ChatBox = (props) => {
  const id = localStorage.getItem("userId");

  const { accountStats, setAccountStats } = useContext(UserContext);

  const [params, setParams] = useState({
    startIndex: 0,
    length: 30,
    msgId: -1,
  });

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const { chat_id } = useParams();
  const [room] = useState("");
  const history = useHistory();

  const getMessages = async () => {
    const result = await getData(
      `api/chat/${chat_id}`,
      { ...params, startIndex: params.startIndex + params.length },
      false
    );
    setParams({ ...params, startIndex: params.startIndex + params.length });
    if (result.data.data.length === 0) setLoadMore(false);
    setMessages([...result.data.data, ...messages]);
  };

  useEffect(() => {
    setLoading(true);
    let canceled = false;
    const source = axios.CancelToken.source();

    async function fetchMsgs() {
      try {
        const messagesResult = await getData(
          `api/chat/${chat_id}`,
          {
            ...params,
          },
          false
        );


      console.log("messagesResult=====>>>>", messagesResult);
      console.log("socket ====>>>",socket);
      socket.emit("join", { userId: id, room: chat_id }, (error) => {
        if (error) {
          alert(error);
        }
      });
      let newMessagesStats = accountStats.messages.filter((value) => {
        return value.chat_id !== chat_id;
      });
      setMessages(messagesResult.data.data);

      setAccountStats({
        ...accountStats,
        messages: newMessagesStats,
      });
    } catch (err) {
      console.log("err=====>>", err);
    }
    }
    if (!canceled) fetchMsgs();
    setLoading(false);

    return () => {
      source.cancel();
      canceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    socket.on("message", async ({ msgId }) => {
      console.log("msgId====>>>", msgId);
      const lastMsg = await getData(
        `api/chat/${chat_id}`,
        {
          startIndex: null,
          length: null,
          msgId: msgId,
        },
        false
      );
      setMessages((messages) => [...messages, lastMsg.data.data[0]]);
    });
    setLoading(false);
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    let date = new Date().toISOString().slice(0, 19).replace("T", " ");
    if (message) {
      console.log("message=====>>>", message);
      const putMessage = await postData(`api/chat/${chat_id}`, {
        content: message,
        date: date,
      });
      console.log("putMessage=====>>>", putMessage);

      socket.emit("sendMessage", {
        room: chat_id,
        msgId: putMessage.data.id,
      });
      const result = await postData(`api/notifications`, {
        notifiedId: props.matchedUser.id,
        type: "message",
      });
      socket.emit("newNotification", {
        userId: id,
        notifiedUser: props.matchedUser.id,
        notifyId: result.data.id,
      });
      setMessages((messages) => [
        ...messages,
        {
          chat_id: chat_id,
          content: message,
          date: date,
          id: 11,
          seen: 0,
          sender_id: id,
        },
      ]);
      setMessage("");
      setAccountStats({ ...accountStats, newMessage: true });
    }
  };

  const handleMessageChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleClickBack = () => {
    history.goBack();
  };

  if (loading)
    return (
      <div className="chatBox">
        <div className="loading">
          <Spin size="large" />
        </div>
      </div>
    );
  return (
    <div className={props && props.mobile ? "mobileChatBox" : "chatBox"}>
      <div className="chatBoxHeader" key = {"chatBoxHeader"}>
        <div className="avatar">
          {props && props.mobile && (
            <div onClick={handleClickBack}>
              <LeftOutlined style={{ fontSize: "25px", color: "#3ca4ff" }} />
            </div>
          )}
          <div>
            <Avatar
              size={50}
              src={`${SER.PicPath}/${props.matchedUser.picture_1}`}
            />
          </div>
        </div>
        <div className="matchDate">
          You matched with{" "}
          {props.matchedUser.firstName.charAt(0).toUpperCase() +
            props.matchedUser.firstName.slice(1)}{" "}
          on {props.matchedUser.date.split("T")[0]}
        </div>
      </div>
      <div className="chatBoxbody" id="chatBoxID" key = "chatBoxbody">
        <InfiniteScroll
          dataLength={messages.length}
          next={getMessages}
          inverse={true}
          hasMore={loadMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="chatBoxID"
          key = {"infinitScroll"}
        >
          {messages.map((element, index) => {
            const lastMessage = messages.length - 1 === index;
            if (element.sender_id === id)
              return (
                <>
                  {
                    <MessageSent
                      message={element}
                      key={element.id}
                    ></MessageSent>
                  }
                  <div ref={lastMessage ? setRef : null} key={element.id + "last"}></div>
                </>
              );
            return (
              <>
                {
                  <MessageReceived
                    message={element}
                    key={element.id}
                  ></MessageReceived>
                }
                <div ref={lastMessage ? setRef : null} key={element.id + "last"}></div>
              </>
            );
          })}
        </InfiniteScroll>
      </div>
      <div className="chatBoxInput" key = "chatBoxInput">
        <Input
          placeholder="Type a message"
          value={message}
          onChange={handleMessageChange}
          className="chatInput"
          onPressEnter={sendMessage}
        />
        <div className="chatButton">
          <Button shape="round" className={"sentBtn"} onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
