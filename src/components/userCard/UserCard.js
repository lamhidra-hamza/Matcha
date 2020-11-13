import React from 'react'
import './UserCard.scss'
import { EnvironmentTwoTone} from '@ant-design/icons'


const UserCard = () => {
    const info = {
        firstName: "Amal",
        age: 20,
        distance: '14',
        img : "https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg",
    }

    return (
        <div className="UserCardContainer">
            <div className="infoPage">
                <div className="fiximg">
                    <img alt="img-card" className="imgCard" src={info.img}/>
                </div>
                <div className="infocontent">
                    <div className="rowboxCard">
                        <h2 className="fisrtNameCard"> {info.firstName}</h2>
                        <h4 style={{marginTop: '8px'}} className="smallfontCard">{info.age}</h4>
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
