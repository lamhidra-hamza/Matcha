import React, { useContext } from 'react'
import './UserCard.scss'
import { EnvironmentTwoTone } from '@ant-design/icons'
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom'
import { SER } from '../../conf/config.js'
import { postData } from '../../tools/globalFunctions'
import { UserContext } from "../../contexts/UserContext";



const UserCard = ({ user }) => {
    const myId = localStorage.getItem("userId");
    const image = user.picture_1 ? `${SER.PicPath}/${user.picture_1}` : null;
    let history = useHistory();
    const { socket } = useContext(UserContext);

    const handelClick = async () => {
        history.push(`/app/infocard/${user.id}`);
        await postData(`api/views`, { viewed_user: user.id });
        const result = await postData(`api/notifications`, {
			notifiedId: user.id,
            type: "view",
		})
		socket.emit("newNotification", {
			userId: myId,
			notifiedUser: user.id,
			notifyId: result.data.id
		});
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
                        <h4 style={{marginTop: '8px'}} className="smallfontCard">
                            {user.age}</h4>
                    </div>
                    <div className="rowboxCard">
                        <EnvironmentTwoTone style={{fontSize: '1.2rem'}} />
                        <h4 className="smallfontCard" style={{color: '#a3a3a3'}}>
                            {user.distance_in_km} kilometers away</h4>
                    </div>
                </div>
            </div>
          </div>
  );
};

export default UserCard;
