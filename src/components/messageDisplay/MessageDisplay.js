import React, { useContext, useState, useEffect } from "react";
import "./MessageDisplay.scss";
import MessageItem from "../messageItem/MessageItem";
import { UserContext } from "../../contexts/UserContext";
import { getData } from "../../tools/globalFunctions";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";


const MessageDisplay = (props) => {
  //   let params = {
  //     startIndex: 0,
  //     endIndex: 10,
  //     lastMessageDate: null,
  //   };

  const { user } = useContext(UserContext);

  const [params, setParams] = useState({
    // page: 0,
    // numberOfItem: 4,
    startIndex: 0,
    length: 6,
    lastMessageDate: null,
  });

  //const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMessages = async () => {
    const result = await getData(
      `api/chat/`,
      { ...params, startIndex: params.startIndex + params.length },
      false
    );
    console.log("the messages result is", result.data.data);
    setParams({ ...params, startIndex: params.startIndex + params.length });
    if (result.data.data.length === 0) setLoadMore(false);
    setMessages([...messages, ...result.data.data]);
  };

  const messageSeen = (msgIndex) => {
  
    setMessages(messages.map((element) => {
      if (element.chat_id == msgIndex)
      {
        return {...element, seen : 1};
      }
      return {...element};
    }));
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoadMore(true);
    async function fetchUsers() {
      setLoading(true);
      const result = await getData(`api/chat/`, params, false);
      console.log(result.data.data);
      setMessages(result.data.data);
      setLoading(false);
    }

    fetchUsers();
    setLoading(false);

    return () => {
      source.cancel();
    };
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
    <div id="scrollingDiv" className="MessageContainer">
      <InfiniteScroll
        dataLength={messages.length + 1}
        next={getMessages}
        hasMore={loadMore}
        inverse={false}
        loader={
          <div className="Scrollloading">
            <Spin />
          </div>
        }
        scrollableTarget="scrollingDiv"
        endMessage={
          <p className="endMessage">
          </p>
        }
      >
        {messages.map((element, index) => {
          return (
            <MessageItem mobile={props.mobile} key={index} message={element} seen = {messageSeen}/>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default MessageDisplay;
