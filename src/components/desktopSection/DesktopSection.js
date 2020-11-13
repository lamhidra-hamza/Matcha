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
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom'

function DesktopSection(props) {
    const [showProfile, setShowProfile] = useState(false);
    const { width } = props;
    let match = useRouteMatch();

    return (
        <div className="mainRow">
            <div className="leftSide">
            <NavbarApp setShowProfile={setShowProfile} showProfile={showProfile}/>
            {showProfile ? 
                    <><ProfileInfo/>
                    <Redirect to={`${match.url}/profile`}/></>
                :
                    <Maintab/>
                }
            </div>
            <Switch>
                <Route exact path={`${match.url}/profile`} component={EditProfile}/>
                <Route exact path={`${match.url}`} component={DisplayUsers}/>
                <Route path={`${match.url}/chatbox`}>
                    <div className="rightSide">
                    <ChatBox />
                    {width > 1300 ? <UserInfo /> : null}
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default DesktopSection
