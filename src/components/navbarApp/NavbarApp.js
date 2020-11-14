import React from 'react'
import { UserOutlined, LeftOutlined, LogoutOutlined} from '@ant-design/icons';
import {Avatar, Typography, Tooltip} from 'antd'
import './NavbarApp.scss'
import { useHistory, useRouteMatch, Link} from 'react-router-dom'

const { Title } = Typography;

export default function NavbarApp({setShowProfile, showProfile}) {

    const history = useHistory();
    const match = useRouteMatch();

    const handelProfileClick = () => {
        history.push({
                pathname: `${match.path}/profile`,
                state: {mobileKey: "4"}
        })
        setShowProfile(true)
    }

    const handelBackfrom = () => {
        setShowProfile(false)
    }

    return (
        <div className="desNavbar">
            <div className="profileIcon">
                {showProfile &&
                    <Link to={{
                        pathname: `${match.path}`,
                        state: {mobileKey: "1"}
                    }}>
                    <div className="returnIcon" onClick={handelBackfrom}>
                        <LeftOutlined style={{color: '#efefef'}}/>
                    </div> </Link>
                }
                <Avatar
                    onClick={handelProfileClick}
                    style={{border: '2px #ffffff solid',marginTop: '6px', marginLeft: "50px"}}
                    src='https://purewows3.imgix.net/images/articles/2020_05/summer_hats_for_women_ale_by_alessandra_straw_hat_with_denim.png?auto=format,compress&cs=strip' size={40} icon={<UserOutlined />} />
                <Title
                    onClick={handelProfileClick}
                    style={titleStyle} 
                    level={3}
                    >My profile</Title> 
                    
            </div>
            <div className="navLogout">
                <Tooltip title="Logout">
                    <LogoutOutlined className="logoutIcon" style={{ fontSize: '2rem' }}/>
                </Tooltip>
            </div>
        </div>
    )
}

const titleStyle = {
    color: '#ffffff',
    fontWeight: '300',
    marginLeft: '5px',
    marginTop: '12px',    
}
