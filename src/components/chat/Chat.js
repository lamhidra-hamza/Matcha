import React, { useState, useEffect, useContext } from "react";
import ChatBox from "../chatBox/ChatBox";
import UserInfo from "../userInfo/UserInfo";
import "./Chat.css";
import { Spin, message } from "antd";
import { getData } from "../../tools/globalFunctions.js";
import { useParams } from "react-router-dom";
import UnMatchPopup from "../unmatchpopup/unmatchpopup.js";
import BlockPopUp from "../blockpopup/blockpopup.js";
import { ErrorStatusContext } from "../../contexts/ErrorContext";

function Chat(props) {
  const [loading, setLoading] = useState(true);
  const [showUnmatchModel, setShowUnmatchModel] = useState(false);
  const [showBlockPopUp, setBlockPopUp] = useState(false);
  const [matchedUser, setMatchedUser] = useState({});
  const { chat_id } = useParams();
  const { setHttpCodeStatus } = useContext(ErrorStatusContext);

  useEffect(() => {
    setLoading(true);
    async function fetchData(){
      try {
        const matchedUserResult = await getData(
          `api/matches/chat/${chat_id}`,
          {},
          false
        );
        setMatchedUser(matchedUserResult.data.user);
        setLoading(false);
      } catch (err) {
        message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
        setHttpCodeStatus(err.response.status);
      }
    }
    fetchData();
  }, [chat_id]);

  if (loading)
    return (
      <div className="chatBox">
        <div className="loading">
          <Spin size="large" />
        </div>
      </div>
    );
  return (
    <div className="rightSide">
      <ChatBox matchedUser={matchedUser} mobile = {props.mobile}/>
      {props.width > 300 && <UserInfo showBlock = {() => setBlockPopUp(!showBlockPopUp)} showUnmatch = {() => {setShowUnmatchModel(!showUnmatchModel)}} matchedUser={matchedUser} />}
      <UnMatchPopup unmatched_user = {matchedUser.id} isVisible = {showUnmatchModel} showUnmatch = {() => {setShowUnmatchModel(!showUnmatchModel)}} />
      <BlockPopUp block_user = {matchedUser.id} isVisible = {showBlockPopUp} showBlock = {() => setBlockPopUp(!showBlockPopUp)} />
    </div>
  );
}

export default Chat;
