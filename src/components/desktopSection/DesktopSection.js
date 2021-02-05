import React, { useState, useContext } from 'react'
import Maintab from '../mainTab/Maintab.js'
import NavbarApp from '../navbarApp/NavbarApp'
import ProfileInfo from '../profileInfo/ProfileInfo'
import Infocard from '../infoCard/Infocard'
import EditProfile from '../editProfile/EditProfile'
import DisplayUsers from '../displayUsers/DisplayUsers'
import DisplayLikedMe from '../displayLikedMe/DisplayLikedMe'
import DisplayViewedMe from '../displayViewedMe/DisplayViewedMe'
import InfocardUsers from '../InfoCardUsers/InfocardUsers'
import './DesktopSection.scss'
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'
import Chat from '../chat/Chat.js'


function DesktopSection(props) {
    const { state } = useLocation();
    //console.log("the message you are looking for is ", state.mobileKey);
    const [showProfile, setShowProfile] = useState(state && state.mobileKey === "5");
    const { width } = props;
    let match = useRouteMatch();
    const { user, userImages, tags } = useContext(UserContext);

    return (
        <div className="mainRow">
            <div className="leftSide">
                <NavbarApp setShowProfile={setShowProfile} showProfile={showProfile}/>
                {showProfile ? <ProfileInfo /> : <Maintab/>}
            </div>
            <Switch>
                <Route exact path={`${match.url}/profile`} render={(props) => (<Infocard {...props} tags={tags} user={user} userImages={userImages}/>)} />
                <Route path={`${match.url}/infocard/:id`} component={InfocardUsers} />
                <Route path={`${match.url}/profile/edit`} component={EditProfile} />
                <Route path={`${match.url}/messages/chatbox/:chat_id`}>
                    <Chat width={width} />
                </Route>
                <Route path={`${match.url}/likedme`} render={(props) => (<DisplayLikedMe {...props} user={user}/>)}/>
                <Route path={`${match.url}/viewedme`} render={(props) => (<DisplayViewedMe {...props} user={user}/>)}/>
                <Route path={`${match.url}/`} render={(props) => (<DisplayUsers {...props} user={user}/>)}/>
            </Switch>
        </div>
    )
}

export default DesktopSection
