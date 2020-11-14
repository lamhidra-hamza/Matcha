import React, { useState } from 'react'
import Maintab from '../mainTab/Maintab.js'
import NavbarApp from '../navbarApp/NavbarApp'
import ProfileInfo from '../profileInfo/ProfileInfo'
import Infocard from '../infoCard/Infocard'
import ChatBox from '../chatBox/ChatBox'
import UserInfo from '../userInfo/UserInfo'
import EditProfile from '../editProfile/EditProfile'
import DisplayUsers from '../displayUsers/DisplayUsers'
import './DesktopSection.css'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

function DesktopSection(props) {
    const [showProfile, setShowProfile] = useState(false);
    const { width } = props;
    let match = useRouteMatch();

    return (
        <div className="mainRow">
            <div className="leftSide">
                <NavbarApp setShowProfile={setShowProfile} showProfile={showProfile}/>
                {showProfile ? <ProfileInfo/> : <Maintab/>}
            </div>
            <Switch>
                <Route exact path={`${match.url}/profile`} component={Infocard} />
                <Route path={`${match.url}/infocard`} component={Infocard} />
                <Route path={`${match.url}/profile/edit`} component={EditProfile} />
                <Route path={`${match.url}/chatbox`}>
                    <div className="rightSide">
                        <ChatBox />
                        {width > 1300 && <UserInfo />}
                    </div>
                </Route>
                <Route path={`${match.url}/`} component={DisplayUsers} />
            </Switch>
        </div>
    )
}

export default DesktopSection
