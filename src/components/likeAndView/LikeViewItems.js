import React from 'react'
import {HeartTwoTone, EyeTwoTone} from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import './LikeViewItems.scss'

const LikeViewItems = () => {

    const history = useHistory();

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
                <div className="titleItem">0 like</div>
            </div>
            <div className="boxItem viewItem" onClick={handleViewClick}>
                <div className="itemCircle">
                    <EyeTwoTone style={{marginTop: '11px'}} />
                </div>
                <div className="titleItem">0 view</div>
            </div>
        </div>
    )
}

export default LikeViewItems
