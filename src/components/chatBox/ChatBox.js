import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { Avatar, Input, Button, Spin } from "antd";
import "./ChatBox.scss";
import MessageSent from "../messageSent/MessageSent";
import MessageReceived from "../messageReceived/MessageReceived";
import axios from "axios";
import { io } from "socket.io-client";
import { UserContext } from "../../contexts/UserContext";
import { getData, postData, putData } from "../../tools/globalFunctions";
import { useParams } from "react-router-dom";
import InfinteScrollReverse from "react-infinite-scroll-reverse";

var socket = io("http://localhost:8000", {
  withCredentials: true,
  extraHeaders: {
    token: "the real token is ",
  },
});

const ChatBox = (props) => {
  const id = localStorage.getItem("userId");

  const { user } = useContext(UserContext);
  const [params, setParams] = useState({
    startIndex: 0,
    length: 30,
    msgId: -1,
  });

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
    console.log("scroll now");
  }, []);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [endMessage, setEndMessage] = useState(false);
  const { chat_id } = useParams();
  const [room, setRoom] = useState("");

  const getMessages = async () => {
    console.log("getMessages ");
    //setLoading(true);
    const result = await getData(
      `api/chat/${chat_id}`,
      { ...params, startIndex: params.startIndex + params.length },
      false
    );
    console.log("the chatbox result is", result.data.data);
    setParams({ ...params, startIndex: params.startIndex + params.length });
    if (result.data.data.length === 0) setLoadMore(false);
    //setLoading(false);
    setMessages([...result.data.data, ...messages]);
  };

  useEffect(async () => {
    setLoading(true);
    const messagesResult = await getData(
      `api/chat/${chat_id}`,
      {
        ...params,
      },
      false
    );
    setMessages(messagesResult.data.data);
    socket.emit("join", { userId: id, room: chat_id }, (error) => {
      if (error) {
        alert(error);
      }
    });
    setLoading(false);
  }, [room, chat_id]);

  useEffect(async () => {
    const source = axios.CancelToken.source();
    await socket.on("message", async ({ msgId }) => {
      const lastMsg = await getData(
        `api/chat/${chat_id}`,
        {
          startIndex: null,
          length: null,
          msgId: msgId,
        },
        false
      );
      setMessages((messages) => [lastMsg.data.data, ...messages]);
    });

    setLoading(false);

    return () => {
      source.cancel();
    };
  }, []);

  const sendMessage = async (event) => {
    console.log(messages);
    event.preventDefault();
    let date = new Date().toISOString().slice(0, 19).replace("T", " ");
    if (message) {
      const putMessage = await postData(`api/chat/${chat_id}`, {
        content: message,
        date: date,
      });
      console.log(putMessage);
      console.log("emit ");
      socket.emit("sendMessage", {
        room: chat_id,
        msgId: putMessage.data.id,
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
    }
  };

  const handleMessageChange = ({ target: { value } }) => {
    setMessage(value);
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
        <InfinteScrollReverse
          className="chatBoxbody"
          hasMore={loadMore}
          isLoading={loading}
          loadMore={getMessages}
        >
          {messages.map((element, index) => {
            {
              console.log(
                "the element length is ",
                messages.length,
                "and the index is ",
                index
              );
            }
            const lastMessage = messages.length - 1 === index;
            console.log("is that the last message", lastMessage);
            if (element.sender_id === id)
              return (
                <div ref={lastMessage ? setRef : null} key={index}>
                  {<MessageSent message={element} key={index}></MessageSent>}
                </div>
              );
            return (
              <div ref={lastMessage ? setRef : null} key={index}>
                {
                  <MessageReceived
                    message={element}
                    key={index}
                  ></MessageReceived>
                }
              </div>
            );
          })}
        </InfinteScrollReverse>
      </div>
      <div className="chatBoxInput">
        <Input
          placeholder="Type a message"
          value={message}
          onChange={handleMessageChange}
          className="chatInput"
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