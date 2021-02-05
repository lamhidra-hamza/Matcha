import React from 'react'
import './MatchCard.scss'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { SER } from '../../conf/config'

export default function MatcheCard(props) {
    const { user } = props;
    let match = useRouteMatch();
    let history = useHistory();
    //const picPath = user.picture_1 ? `${SER.PicPath}/${user.picture_1}` : "";

    const handelClick = () => {
        history.push({
            pathname: `${match.path}/messages/chatbox/${user.chat_id}`,
            state: {
                    mobileKey: "4",
                    desKey: "1",
                    mobile: props.mobile,
            }
        })
    }

    return (
            <div className="MatchesCard" onClick={handelClick}>
                {console.log("the user info are", user)}
                <div className="matcheItems">
                    <div className="matcheItem">
                        <div className="identity">
                            <div className="firstNameStyle">{user.firstName} </div> 
                            <div style={{fontSize: '1rem', marginLeft: '3px'}} className="firstNameStyle">
                                {user.age}
                            </div>
                        </div>
                        <img alt= "card" className="imageMatche" src={`${SER.PicPath}/${user.picture_1}`}></img>
                    </div>
                </div>
            </div>
    )
}
