import React, { useState } from 'react'
import Maintab from '../mainTab/Maintab.js'
import NavbarApp from '../navbarApp/NavbarApp'
import ProfileInfo from '../profileInfo/ProfileInfo'
import Infocard from '../infoCard/Infocard'
import ChatBox from '../chatBox/ChatBox'
import UserInfo from '../userInfo/UserInfo'
import EditProfile from '../editProfile/EditProfile'
import './DesktopSection.css'

function DesktopSection(props) {
    const [showProfile, setShowProfile] = useState(false);
    const { width } = props;

    return (
        <div className="mainRow">
            <div className="leftSide">
            <NavbarApp setShowProfile={setShowProfile} showProfile={showProfile}/>
            {showProfile ? <ProfileInfo/> : <Maintab/>}
            </div>
            {/* <EditProfile /> */}
            {/* <Infocard/> */}
            <div className="rightSide">
            <ChatBox />
            {width > 1300 ? <UserInfo /> : null}
            </div>
        </div>
    )
}

export default DesktopSection
