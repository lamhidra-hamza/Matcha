import React, { useState } from 'react'
import './Mainapp.scss'
import Maintab from '../components/mainTab/Maintab.js'
import NavbarApp from '../components/navbarApp/NavbarApp'
import ProfileInfo from '../components/profileInfo/ProfileInfo'
import ChatBox from '../components/chatBox/ChatBox'
import UserInfo from '../components/userInfo/UserInfo'



export default function Mainapp() {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div className="containerMainapp">
      <div className="mainRow">
        <div className="leftSide">
        <NavbarApp setShowProfile={setShowProfile} showProfile={showProfile}/>
                    {showProfile ? <ProfileInfo/> : <Maintab/>}
        </div>
        <div className="rightSide">
          <ChatBox /> 
          <UserInfo />
        </div>
      </div>
    </div>
  )
}
