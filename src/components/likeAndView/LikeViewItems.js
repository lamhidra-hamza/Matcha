import React, {useContext} from 'react'
import {HeartTwoTone, EyeTwoTone} from '@ant-design/icons';
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from 'react-router-dom'
import './LikeViewItems.scss'

const LikeViewItems = () => {

    const history = useHistory();
    const { accountStats } = useContext(UserContext);
    const handleLikeClick = () => {
        history.push({
				pathname: '/app/likedme',
                state: {
                    mobileKey: "3",
                    desKey: "1",
                    mobile: false,
                }
		})
    }

    const handleViewClick = () => {
        history.push({
				pathname: '/app/Viewedme',
                state: {
                    mobileKey: "4",
                    desKey: "1",
                    mobile: false,
                }
		})
    }

    return (
        <div className="likeAndView">
            <div className="boxItem likeItem" onClick={handleLikeClick}>
                <div className="itemCircle">
                    <HeartTwoTone style={{marginTop: '11px'}} twoToneColor="#eb2f96" />
                </div>
                <div className="titleItem">{accountStats.likes} like</div>
            </div>
            <div className="boxItem viewItem" onClick={handleViewClick}>
                <div className="itemCircle">
                    <EyeTwoTone style={{marginTop: '11px'}} />
                </div>
                <div className="titleItem">{accountStats.views} view</div>
            </div>
        </div>
    )
}

export default LikeViewItems
