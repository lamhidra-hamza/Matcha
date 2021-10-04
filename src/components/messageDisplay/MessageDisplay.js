import React, { useContext, useState, useEffect } from "react";
import "./MessageDisplay.scss";
import MessageItem from "../messageItem/MessageItem";
import { UserContext } from "../../contexts/UserContext";
import { getData } from "../../tools/globalFunctions";
import { Spin, message } from "antd";
import axios from "axios";
import InfiniteScrollReverse from "react-infinite-scroll-reverse/dist/InfiniteScrollReverse";

const MessageDisplay = (props) => {

  const {accountStats, setAccountStats } = useContext(UserContext);

  const [params, setParams] = useState({
    startIndex: 0,
    length: 6,
    lastMessageDate: null,
  });

  const [loadMore, setLoadMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMessages = async () => {
    try {
      const result = await getData(
        `api/chat/`,
        { ...params, startIndex: params.startIndex + params.length },
        false
      );
      setParams({ ...params, startIndex: params.startIndex + params.length });
      if (result.data.data.length === 0) setLoadMore(false);
      setMessages([...messages, ...result.data.data]);
    } catch (err) {
      message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
    }
  };

  const messageSeen = (msgIndex) => {
    setMessages(
      messages.map((element) => {
        if (element.chat_id === msgIndex) {
          return { ...element, seen: 1 };
        }
        return { ...element };
      })
    );
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoadMore(true);
    async function fetchUsers() {
      try {
        setLoading(true);
        const result = await getData(`api/chat/`, params, false);
        setMessages(result.data.data);
        setLoading(false);
      } catch (err) {
        console.log("err ======>>>", err);
        message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
      }
    }

    fetchUsers();
    setLoading(false);

    return () => {
      source.cancel();
    };
        // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [params]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function fetchUsers() {
      try {
        const UnReadResult = await getData(`api/chat/count`, {}, false);
        let unReadMessages = accountStats.messages.concat(
          UnReadResult.data.data.messages
        );
        let unReadMessagesIds = unReadMessages.map((o) => o.chat_id);
        unReadMessages = unReadMessages.filter(({ chat_id }, index) => {
          return unReadMessagesIds.indexOf(chat_id) === index;
        });
        setAccountStats({
          ...accountStats,
          newMessage: false,
          messages: unReadMessages,
        });
        const result = await getData(
          `api/chat/`,
          params,
          false
        );
        let newMessageArray = [...result.data.data, ...messages];
        let ids = newMessageArray.map((o) => o.chat_id);
        newMessageArray = newMessageArray.filter(({ chat_id }, index) => {
          return ids.indexOf(chat_id) === index;
        });
        setMessages(newMessageArray); 
      } catch (err) {
        console.log("err1 ======>>>", err.response);
        message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
      }
    }
    fetchUsers();
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountStats.newMessage]);

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
      <InfiniteScrollReverse
        dataLength={messages.length - 1}
        next={getMessages}
        loadMore={getMessages}
        hasMore = {loadMore}
        inverse={false}
        isLoading = {false}
        loader={
          <div className="Scrollloading">
            <Spin />
          </div>
        }
        scrollableTarget="scrollingDiv"
        endMessage={<p className="endMessage"></p>}
      >
        {messages.map((element, index) => {
          return (
            <MessageItem
              mobile={props.mobile}
              key={element.chat_id}
              message={element}
              seen={messageSeen}
            />
          );
        })}
      </InfiniteScrollReverse>
    </div>
  );
};

export default MessageDisplay;
