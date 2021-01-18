import React from 'react'
import './UserCard.scss'
import { EnvironmentTwoTone } from '@ant-design/icons'
import { Skeleton } from 'antd';
import { useRouteMatch, useHistory } from 'react-router-dom'
import { SER } from '../../conf/config.js'
import { postData } from '../../tools/globalFunctions'



const UserCard = ({ user }) => {

    const image = user.picture_1 ? `${SER.PicPath}/${user.picture_1}` : null;
    let history = useHistory();

    const handelClick = () => {
        history.push(`/app/infocard/${user.id}`);
        postData(`api/views`, { viewed_user: user.id });

    }

    return (
        <div className="UserCardContainer" onClick={handelClick}>
            <div className="infoPage">
                <div className="fiximg">
                    {image ?
                        <img alt="img-card" className="imgCard" src={image}/> :
                            <Skeleton.Image />}
                </div>
                <div className="infocontent">
                    <div className="rowboxCard">
                        <h2 className="fisrtNameCard"> {user.firstName}</h2>
                    <h4 style={{marginTop: '8px'}} className="smallfontCard">{user.age}</h4>
                    </div>
                    <div className="rowboxCard">
                        <EnvironmentTwoTone style={{fontSize: '1.2rem'}} />
                        <h4 className="smallfontCard" style={{color: '#a3a3a3'}}>{user.distance_in_km} kilometers away</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
