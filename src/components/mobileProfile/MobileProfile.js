import React from 'react'
import './MobileProfile.css';
import { Avatar } from 'antd';
import { UserOutlined, ToolFilled, EditFilled } from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom'
import { calculate_age } from '../../tools/globalFunctions'
import { SER } from '../../conf/config'

const MobileProfile = ({ user, userImages }) => {
    const history = useHistory();
    const match = useRouteMatch();
    const pic = userImages && userImages.picture_1
        ? `${SER.PicPath}/${userImages.picture_1}` : "";

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
                    <Avatar size={100} icon={<UserOutlined />} src={pic} />
                    <h2 style={{ fontWeight: '600' }}>{user.firstName} {calculate_age(user.bornDate)}</h2>
                    <h4>{user.job}</h4>
                    <h4>{user.biography}</h4>
                </div>
                <div className="profilebtn">
                    <div className="ColumnIc">
                        <div onClick={() => handelbtnsClick("/settings", "5", "1")} className="profSettings cycleBorder">
                            <ToolFilled style={{ color: '#5c5c5c' }} />
                        </div>
                        <h4>Settings</h4>
                    </div>
                    <div className="ColumnIc">
                        <div onClick={() => handelbtnsClick("/edit", "5", "1")} className="profEdit cycleBorder">
                            <EditFilled style={{ color: '#5c5c5c' }} />
                        </div>
                        <h4>Eddit</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileProfile