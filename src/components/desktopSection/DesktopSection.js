import React, { useState, useContext } from 'react'
import Maintab from '../mainTab/Maintab.js'
import NavbarApp from '../navbarApp/NavbarApp'
import ProfileInfo from '../profileInfo/ProfileInfo'
import Infocard from '../infoCard/Infocard'
import ChatBox from '../chatBox/ChatBox'
import UserInfo from '../userInfo/UserInfo'
import EditProfile from '../editProfile/EditProfile'
import DisplayUsers from '../displayUsers/DisplayUsers'
import './DesktopSection.css'
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'


function DesktopSection(props) {
    const { state } = useLocation();
    const [showProfile, setShowProfile] = useState(state && state.mobileKey === "5");
    const { width } = props;
    let match = useRouteMatch();
    const {user, userImages, tags} = useContext(UserContext);

    return (
        <div className="mainRow">
            <div className="leftSide">
                <NavbarApp setShowProfile={setShowProfile} showProfile={showProfile}/>
                {showProfile ? <ProfileInfo /> : <Maintab/>}
            </div>
            <Switch>
                <Route exact path={`${match.url}/profile`} render={(props) => (<Infocard {...props} tags={tags} user={user} userImages={userImages}/>)} />
                <Route path={`${match.url}/infocard`} component={Infocard} />
                <Route path={`${match.url}/profile/edit`} component={EditProfile} />
                <Route path={`${match.url}/messages/chatbox`}>
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
