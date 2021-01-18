import React, { useContext } from 'react'
import './MobileSection.scss'
import { Tabs, Divider, Button } from 'antd'
import MobileProfile from '../mobileProfile/MobileProfile'
import {
	FireFilled,
	MessageFilled,
	ContactsFilled,
	HeartFilled,
	LogoutOutlined,
	EyeFilled
} from '@ant-design/icons'
import MessageDisplay from '../messageDisplay/MessageDisplay'
import { useLocation, useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import DisplayUsers from '../displayUsers/DisplayUsers'
import EditProfile from '../editProfile/EditProfile'
import ProfileInfo from '../profileInfo/ProfileInfo'
import InfocardUsers from '../InfoCardUsers/InfocardUsers'
import DisplayLikedMe from '../displayLikedMe/DisplayLikedMe'
import DisplayViewedMe from '../displayViewedMe/DisplayViewedMe'
import ChatBox from '../chatBox/ChatBox';
import { logOut } from '../../tools/globalFunctions';
import { UserContext } from '../../contexts/UserContext'


const { TabPane } = Tabs

function MobileSection() {

	let { state } = useLocation();
	const history = useHistory();
	const match = useRouteMatch();
	const { user, userImages, tags } = useContext(UserContext);


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
				<TabPane
					key="1"
					className="mobileTab"
					tab={<span onClick={() => handelTabClick("", "1", "1")} className="mobileNavIcon">
						<FireFilled /></span>} >
					<Route
						path={`${match.url}/infocard/:id`}
						render={(props) => (<InfocardUsers {...props} mobile={true} />)} />
					<Route
						path={`${match.url}/`}
						render={(props) => (<DisplayUsers {...props} user={user} />)} />
					<div style={{ height: "200px", backgroundColor: '#f6f7fa' }} />
				</TabPane>
				<TabPane
					className="mobileTab scrollTab"
					key="2"
					tab={<span
						onClick={() => handelTabClick("/likedme", "2", "1")}
						className="mobileNavIcon">
						<HeartFilled />
					</span>} >
					<Route
						path={`${match.url}/infocard/:id`}
						render={(props) => (<InfocardUsers {...props} mobile={true} />)} />
					<Route
						path={`${match.url}/likedme`}
						render={(props) => (<DisplayLikedMe {...props} user={user} />)} />
					<div style={{ height: "200px", backgroundColor: '#f6f7fa' }} />
				</TabPane>
				<TabPane
					className="mobileTab scrollTab"
					key="3"
					tab={<span
						onClick={() => handelTabClick("/viewedme", "3", "1")}
						className="mobileNavIcon">
						<EyeFilled />
					</span>}>
					<Route
						path={`${match.url}/infocard/:id`}
						render={(props) => (<InfocardUsers {...props} mobile={true} />)} />
					<Route
						path={`${match.url}/viewedme`}
						render={(props) => (<DisplayViewedMe {...props} user={user} />)} />
					<div style={{ height: "200px", backgroundColor: '#f6f7fa' }} />
				</TabPane>
				<TabPane
					className="mobileTab scrollTab"
					key="4"
					tab={<span
							onClick={() => handelTabClick("/messages", "4", "2")}
							className="mobileNavIcon"> <MessageFilled />
						</span>}>
					<Route path={`${match.path}/messages/chatbox`}><ChatBox /></Route>
					<Route path={`${match.path}/messages`}><MessageDisplay mobile={true} /></Route>
				</TabPane>
				<TabPane 
					className="mobileTab"
					key="5"
					tab={<span onClick={() => handelTabClick("/profile", "5", "1")}
					className="mobileNavIcon">
						<ContactsFilled />
					</span>} >
					<Switch>
						<Route exact path={`${match.path}/profile`}>
							<MobileProfile
								user={user}
								userImages={userImages}
								style={{ display: 'flex', justifyContent: 'center' }} />
						</Route>
						<Route path={`${match.path}/profile/edit`}><EditProfile mobile="mobile" /></Route>
						<Route path={`${match.path}/profile/settings`}><ProfileInfo mobile="mobile" /></Route>
					</Switch>
				</TabPane>
			</Tabs>
			<Divider style={{ margin: '0', width: '70%' }} />
			<div className="downNav">
				<Button
					style={{ top: '-15px' }}
					type="primary"
					size="large"
					shape="circle"
					icon={<LogoutOutlined />}
					onClick={logout} />
			</div>
		</div>
	)
}

export default MobileSection
