import React, { useContext } from 'react'
import { UserOutlined, LeftOutlined, LogoutOutlined, NotificationOutlined} from '@ant-design/icons';
import { Avatar, Typography, Tooltip, Badge, Popover, Empty } from 'antd'
import './NavbarApp.scss'
import { useHistory, useRouteMatch, Link} from 'react-router-dom'
import { logOut } from '../../tools/globalFunctions';
import { UserContext } from '../../contexts/UserContext';
import { NotificationsContext } from '../../contexts/Notifications';
import { getDayString } from '../../tools/dateFuncts';
import { SER } from '../../conf/config'

const { Title } = Typography;

export default function NavbarApp({setShowProfile, showProfile}) {

    const history = useHistory();
    const match = useRouteMatch();
    const { userImages } = useContext(UserContext);
    const { Notification } = useContext(NotificationsContext);
    const pic = userImages && userImages.picture_1
        ? `${SER.PicPath}/${userImages.picture_1}` : "";

    const logout = async () => {
        await logOut();
        console.log("Redirect");
        history.push("/");
    }

    const handelProfileClick = () => {
        history.push({
                pathname: `${match.path}/profile`,
                state: {
                    mobileKey: "5",
                    desKey: "1", 
                    mobile: false,
                },
        })
        setShowProfile(true)
    }

    const handelBackfrom = () => {
        setShowProfile(false)
    }

    const content = (
        <div>
            {Notification?.length ?
                Notification.map((item, index) => {
                const itemTime = new Date(Date.parse(item.date));
                const dateNow = new Date(Date.now());
                if (item.type === "like")
                    return <p key={item.id}>
                        New Like at {getDayString(dateNow, itemTime)
                        }</p>
                if (item.type === "matche")
                    return <p key={item.id}>
                        New Matche at {getDayString(dateNow, itemTime)
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
        <div className="desNavbar">
            <div className="profileIcon">
                {showProfile &&
                    <Link to={{
                        pathname: `${match.path}`,
                        state: {
                            mobileKey: "1",
                            desKey: "1", 
                            mobile: false
                        }
                    }}>
                    <div className="returnIcon" onClick={handelBackfrom}>
                        <LeftOutlined style={{color: '#efefef'}}/>
                    </div> </Link>
                }
                <Avatar
                    onClick={handelProfileClick}
                    style={{border: '2px #ffffff solid',marginTop: '6px', marginLeft: "50px"}}
                    src={pic} size={40} icon={<UserOutlined />} />
                <Title
                    onClick={handelProfileClick}
                    style={titleStyle} 
                    level={3}
                    >My profile</Title> 
                    
            </div>
            <div className="navLogout">
                <Popover
                    placement="bottomRight"
                    title={<span>Notifications</span>}
                    content={content}
                    trigger="click"
                    >
                    <Badge count={Notification?.length}  style={{margin: '1.5px 17px'}}>
                        <NotificationOutlined className="logoutIcon" style={{ fontSize: '1.7rem', marginRight: '15px'}}/>
                    </Badge>
                </Popover>
                <Tooltip title="Logout">
                    <LogoutOutlined className="logoutIcon" style={{ fontSize: '1.7rem' }}  onClick = {logout}/>
                </Tooltip>
            </div>
        </div>
    )
}

const titleStyle = {
    color: '#ffffff',
    fontWeight: '300',
    marginLeft: '5px',
    marginTop: '12px'
}
