import React, { useState, useContext, useEffect } from "react";
import Maintab from "../mainTab/Maintab.js";
import NavbarApp from "../navbarApp/NavbarApp";
import ProfileInfo from "../profileInfo/ProfileInfo";
import Infocard from "../infoCard/Infocard";
import ChatBox from "../chatBox/ChatBox";
import UserInfo from "../userInfo/UserInfo";
import "./Chat.css";
import { Spin } from "antd";
import { getData } from "../../tools/globalFunctions.js";
import { useParams } from "react-router-dom";
import UnMatchPopup from "../unmatchpopup/unmatchpopup.js";
import BlockPopUp from "../blockpopup/blockpopup.js";

function Chat(props) {
  const [loading, setLoading] = useState(true);
  const [showUnmatchModel, setShowUnmatchModel] = useState(false);
  const [showBlockPopUp, setBlockPopUp] = useState(false);
  const [matchedUser, setMatchedUser] = useState({});
  const { chat_id } = useParams();

  useEffect(async () => {
    setLoading(true);
    const matchedUserResult = await getData(
      `api/matches/chat/${chat_id}`,
      {},
      false
    );
    console.log("the matched user is ", matchedUserResult.data.user);
    setMatchedUser(matchedUserResult.data.user);
    setLoading(false);
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
