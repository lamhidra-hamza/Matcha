import React from 'react'
import './MobileProfile.css';
import {Avatar} from 'antd';
import { UserOutlined, ToolFilled, EditFilled} from '@ant-design/icons';
import { useHistory, useRouteMatch, Link} from 'react-router-dom'

const MobileProfile = () => {
    const history = useHistory();
    const match = useRouteMatch();

    const handelbtnsClick = (path, mobileKey, desKey) => {
        history.push({
                pathname: `${match.path}${path}`,
                state: {
                    mobileKey: mobileKey,
                    desKey: desKey,
                    mobile: true
                },
        })
    }

    return (
        <div className="mobileProf">
            <div className="topSections">
                <div className="profileInfoSec">
                    <Avatar size={100} icon={<UserOutlined />} src="https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg"/>
                    <h2 style={{fontWeight: '600'}}>Amal 22</h2>
                    <h4>Student</h4>
                    <h4>1337</h4>
                </div>
                <div className="profilebtn">
                    <div className="ColumnIc">
                        <div onClick={() => handelbtnsClick("/settings", "4", "1")} className="profSettings cycleBorder">
                            <ToolFilled style={{color: '#5c5c5c'}}/>
                        </div>
                        <h4>Settings</h4>
                    </div>
                    <div className="ColumnIc">
                        <div onClick={() => handelbtnsClick("/edit", "4", "1")} className="profEdit cycleBorder">
                            <EditFilled style={{color: '#5c5c5c'}}/>
                        </div>
                        <h4>Eddit</h4>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default MobileProfile
