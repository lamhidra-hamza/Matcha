import React from 'react'
import './UserCard.scss'
import { EnvironmentTwoTone } from '@ant-design/icons'
import { Skeleton } from 'antd';
import { useRouteMatch, useHistory } from 'react-router-dom'
import { calculate_age } from '../../tools/globalFunctions.js'
import { SER } from '../../conf/config.js'



const UserCard = ({ user }) => {
    const info = {
        firstName: "Amal",
        age: 20,
        distance: '14',
        img : "https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg",
    }

    const image = user.picture_1 ? `${SER.PicPath}/${user.picture_1}` : null;
    let match = useRouteMatch();
    let history = useHistory();

    const handelClick = () => {
        console.log(match)
        history.push(`${match.url}/infocard`)
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
                        <h4 className="smallfontCard" style={{color: '#a3a3a3'}}>{info.distance} kilometers away</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
