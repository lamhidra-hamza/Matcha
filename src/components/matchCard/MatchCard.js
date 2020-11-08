import React from 'react'
import './MatchCard.scss'

export default function MatcheCard() {
    return (
            <div className="MatchesCard">
                <div style={{color: 'white',}} className="firstNameStyle">Amal</div>  
                <img className="imageMatche" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSL6vwnCe5gGb6_XoBU4zyqCyv0O7MXBXl-TA&usqp=CAU"></img>
                
            </div>
    )
}

const firstNameStyle = {
    color: 'white',
    position: 'absolute',
    zIndex: '1',
    bottom: '2px',
    left: 'auto',
    right: 'auto',
    fontWeight: '450',
}