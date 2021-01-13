import React, { useEffect, useRef, useState, useContext } from "react";
import { Avatar, Input, Button, Spin } from "antd";
import "./ChatBox.scss";
import MessageSent from "../messageSent/MessageSent";
import MessageReceived from "../messageReceived/MessageReceived";
//import { UserContext } from "../../contexts/UserContext";
import { io } from "socket.io-client";
import { UserContext } from "../../contexts/UserContext";
import { getData, postData, putData } from "../../tools/globalFunctions";
import { useParams } from 'react-router-dom';



var socket = io("http://localhost:8000", {
  withCredentials: true,
  extraHeaders: {
    token: "the real token is ",
  },
});

const ChatBox = (props) => {
  var messagesEndRef = useRef();
  const id = localStorage.getItem("userId");

  const { user } = useContext(UserContext);
  const [Params, setParams] = useState({
		page : 0,
		numberOfItem: 4
	});
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { chat_id } = useParams();
  const startIndex = 10;

  useEffect(async () => {
    const messagesResult = await getData(
      `api/chat/${chat_id}`,
      {
        startIndex: 0,
        length: 10,
        msgId: -1,
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
    if (!loading) {
      messagesEndRef.current.scrollIntoView({ block: "end" });
    }    //scrollDown();
  }, [room, chat_id]);

  useEffect(async () => {
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
      setMessages((messages) => [...messages, lastMsg.data.data[0]]);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      messagesEndRef.current.scrollIntoView({ block: "end" });
    }
  }, [messages]);

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
      <div className="containerMainapp">
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
        <div>
          {messages.map((element) => {
            if (element.sender_id === id)
              return <MessageSent message={element} />;
            return <MessageReceived message={element} />;
          })}
        </div>
        <div ref={messagesEndRef}></div>
      </div>
      <div className="chatBoxInput">
        <div className="chatInput">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={handleMessageChange}
            style={{
              height: "4vh",
              borderRadius: "10px",
            }}
          />
        </div>
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
