import React from 'react'
import './MatchCard.scss'

export default function MatcheCard() {
    return (
            <div className="MatchesCard">
                <div className="matcheItems">
                    <div className="matcheItem">
                        <div className="identity">
                            <div className="firstNameStyle">Amal </div> 
                            <div style={{fontSize: '1rem', marginLeft: '3px'}} className="firstNameStyle">20</div>
                        </div>
                        <img alt= "card" className="imageMatche" src="https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg"></img>
                    </div>
                </div>
            </div>
    )
}
