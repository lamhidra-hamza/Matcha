import React, { useState, useEffect } from 'react'
import './Mainapp.scss'
import Maintab from '../components/mainTab/Maintab.js'
import NavbarApp from '../components/navbarApp/NavbarApp'
import ProfileInfo from '../components/profileInfo/ProfileInfo'
import Infocard from '../components/infoCard/Infocard'
import ChatBox from '../components/chatBox/ChatBox'
import UserInfo from '../components/userInfo/UserInfo'
import EditProfile from '../components/editProfile/EditProfile'

export default function Mainapp() {
  
   const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

  const [showProfile, setShowProfile] = useState(false);

  const [width, setWidth] = useState(getWidth());


   useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(getWidth())
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);
    console.log(width);
    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  })

  return (
    <div className="containerMainapp">
      <div className="mainRow">
        <div className="leftSide">
        <NavbarApp setShowProfile={setShowProfile} showProfile={showProfile}/>
        {showProfile ? <ProfileInfo/> : <Maintab/>}
        </div>
        <EditProfile />
        {/* <Infocard/> */}
        {/* <div className="rightSide">
          <ChatBox />
          {width > 1300 ? <UserInfo /> : null}
        </div> */}
      </div>
    </div>
  )
}
