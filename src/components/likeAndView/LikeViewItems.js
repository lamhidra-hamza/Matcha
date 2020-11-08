import React from 'react'
import {HeartTwoTone, EyeTwoTone} from '@ant-design/icons';
import './LikeViewItems.scss'

const LikeViewItems = () => {
    return (
        <div className="likeAndView">
            <div className="boxItem likeItem">
                <div className="itemCircle">
                    <HeartTwoTone style={{marginTop: '11px'}} twoToneColor="#eb2f96" />
                </div>
                <div className="titleItem">0 like</div>
            </div>
            <div className="boxItem viewItem">
                <div className="itemCircle">
                    <EyeTwoTone style={{marginTop: '11px'}} />
                </div>
                <div className="titleItem">0 view</div>
            </div>
        </div>
    )
}

export default LikeViewItems
