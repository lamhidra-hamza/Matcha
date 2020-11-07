import React from 'react'
import './MatchCard.scss'
import { Badge } from 'antd';

export default function MatcheCard() {
    return (
            <div className="MatchesCard">
                <img className="imageMatche" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSL6vwnCe5gGb6_XoBU4zyqCyv0O7MXBXl-TA&usqp=CAU"></img>
                <Badge count={5}></Badge>
            </div>
    )
}
