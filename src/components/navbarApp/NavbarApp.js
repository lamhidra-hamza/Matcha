import React from 'react'
import { UserOutlined, LeftOutlined } from '@ant-design/icons';
import {Avatar, Typography} from 'antd'
import './NavbarApp.css'

const { Title } = Typography;

export default function NavbarApp({setShowProfile, showProfile}) {
    return (
        <div className="desNavbar">
            <div className="profileIcon">
                {showProfile ?
                    <div className="returnIcon" onClick={() => setShowProfile(false)}>
                        <LeftOutlined style={{color: '#efefef'}}/>
                    </div> : ''
                }
                <Avatar
                    onClick={() => setShowProfile(true)}
                    style={{border: '2px #ffffff solid',marginTop: '6px', marginLeft: "50px"}}
                    src='https://purewows3.imgix.net/images/articles/2020_05/summer_hats_for_women_ale_by_alessandra_straw_hat_with_denim.png?auto=format,compress&cs=strip' size={40} icon={<UserOutlined />} />
                <Title
                    onClick={() => setShowProfile(true)}
                    style={titleStyle} 
                    level={3}
                    >My profile</Title>
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
