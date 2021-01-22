import React, { useContext } from 'react'
import { useLocation, useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import './MobileSection.scss'
import { Tabs, Divider, Button, Badge, Popover, Empty } from 'antd'
import MobileProfile from '../mobileProfile/MobileProfile'
import {
	FireFilled,
	MessageFilled,
	ContactsFilled,
	HeartFilled,
	LogoutOutlined,
	EyeFilled,
	NotificationOutlined
} from '@ant-design/icons'
import MessageDisplay from '../messageDisplay/MessageDisplay'
import DisplayUsers from '../displayUsers/DisplayUsers'
import EditProfile from '../editProfile/EditProfile'
import ProfileInfo from '../profileInfo/ProfileInfo'
import InfocardUsers from '../InfoCardUsers/InfocardUsers'
import DisplayLikedMe from '../displayLikedMe/DisplayLikedMe'
import DisplayViewedMe from '../displayViewedMe/DisplayViewedMe'
import ChatBox from '../chatBox/ChatBox';
import { logOut, putData } from '../../tools/globalFunctions';
import { getDayString } from '../../tools/dateFuncts';
import { UserContext } from '../../contexts/UserContext';
import Chat from '../chat/Chat.js'



const { TabPane } = Tabs

function MobileSection() {

	let { state } = useLocation();
	const history = useHistory();
	const match = useRouteMatch();
	const { user, userImages, Notification, setNotification } = useContext(UserContext);


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

	const handleNotificationBtnClick = async () => {
        Notification.map((item) => {
            putData(`api/notifications/${item.id}`, { readed: 1 })
        })
    }

    const content = (
        <div>
            {Notification?.length ?
                Notification.map((item, index) => {
                const itemTime = new Date(Date.parse(item.date));
                const dateNow = new Date(Date.now());
                return <p key={item.id}>
                    New {item.type} at {getDayString(dateNow, itemTime)
                    }</p>
            }) :
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span>
                     No Notification
                    </span>
                  }
                />
        }
        </div>
      );

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
					<Route exact path={`${match.path}/messages`}><MessageDisplay mobile={true} /></Route>
					<Route path={`${match.path}/messages/chatbox/:chat_id`} render={(props) => (<Chat {...props} mobile={true} />)} />
					{/* <div style={{ height: "200px", backgroundColor: '#f6f7fa' }} /> */}
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
					style={{ top: '-15px', left: '-5px'}}
					type="primary"
					size="large"
					shape="circle"
					icon={<LogoutOutlined />}
					onClick={logout} />
				<Popover
                    placement="bottomRight"
                    title={<span>Notifications</span>}
                    content={content}
                    trigger="click"
                    onVisibleChange={(visible) => !visible && setNotification([])}
                    >
					<Button
						style={{ top: '-15px', right: '-5px' }}
						type="primary"
						size="large"
						shape="circle"
						icon={<Badge
							count={Notification?.length} 
							size="small"
							style={{marginBottom: '10px'}}>
								<NotificationOutlined /></Badge>}
						onClick={handleNotificationBtnClick} />
                </Popover>
			</div>
		</div>
	)
}

export default MobileSection
