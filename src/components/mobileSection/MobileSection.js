import React from 'react'
import './MobileSection.css'
import { Tabs, Divider, Button } from 'antd'
import MobileProfile from '../mobileProfile/MobileProfile'
import {
  FireFilled,
  MessageFilled,
  ContactsFilled,
  HeartFilled,
  LogoutOutlined,
} from '@ant-design/icons'
import MessageDisplay from '../messageDisplay/MessageDisplay'
import { useLocation, useHistory, useRouteMatch, Switch, Route} from 'react-router-dom'
import DisplayUsers from '../displayUsers/DisplayUsers'
import EditProfile from '../editProfile/EditProfile'
import ProfileInfo from '../profileInfo/ProfileInfo'
import ChatBox from '../chatBox/ChatBox';
import {logOut} from '../../tools/globalFunctions';


const { TabPane } = Tabs

function MobileSection() {

	let { state } = useLocation();
	const history = useHistory();
	const match = useRouteMatch();
	
	const handelDefaultKey = () => {
		if (state)
			return state.mobileKey;
		return "1";
	}

	const handelTabClick = (location, mobileKey, desKey) => {
		history.push({
			pathname: `${match.path}${location}`,
			state: {
					mobileKey: mobileKey,
					desKey: desKey,
					mobile: true
				},	
		})
	}

	const logout = async () => {
        await logOut();
        console.log("Redirect");
        history.push("/");
    }
	
	return (
		<div className="mobileSection">
			<Tabs defaultActiveKey={handelDefaultKey}>
				<TabPane className="mobileTab" tab={<span onClick={() => handelTabClick("", "1", "1")} className="mobileNavIcon"> <FireFilled /></span>} key="1" >
					<DisplayUsers/>
				</TabPane>
				<TabPane className="mobileTab scrollTab" tab={<span onClick={() => handelTabClick("", "2", "1")} className="mobileNavIcon"> <HeartFilled /></span>} key="2" >
					<DisplayUsers/>
					<div style={{height: "200px", backgroundColor: '#f6f7fa'}}/>
				</TabPane>
				<TabPane className="mobileTab scrollTab" tab={<span onClick={() => handelTabClick("", "3", "1")} className="mobileNavIcon"> <HeartFilled /></span>} key="3" >
					<DisplayUsers/>
					<div style={{height: "200px", backgroundColor: '#f6f7fa'}}/>
				</TabPane>
				<TabPane className="mobileTab scrollTab" tab={<span onClick={() => handelTabClick("/messages", "4", "2")} className="mobileNavIcon"> <MessageFilled /></span>} key="4" >
					<Route path={`${match.path}/messages/chatbox`}><ChatBox/></Route>
					<Route path={`${match.path}/messages`}><MessageDisplay mobile={true}/></Route>
				</TabPane>
				<TabPane className="mobileTab" tab={<span onClick={() => handelTabClick("/profile", "5", "1")} className="mobileNavIcon"> <ContactsFilled /></span>} key="5" >
					<Switch>
						<Route exact path={`${match.path}/profile`}>
							<MobileProfile style={{display: 'flex', justifyContent: 'center'}}/> </Route>
						<Route path={`${match.path}/profile/edit`}><EditProfile mobile="mobile" /></Route>
						<Route path={`${match.path}/profile/settings`}><ProfileInfo mobile="mobile" /></Route>
					</Switch>
				</TabPane>
			</Tabs>
			<Divider style={{margin: '0', width: '70%'}}/>
			<div className="downNav">
			<Button style={{top: '-15px'}} type="primary" size="large" shape="circle" icon={<LogoutOutlined />} onClick = {logout}/>
			</div>
		</div>
	)
}

export default MobileSection
