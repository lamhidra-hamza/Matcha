import React from 'react'
import { Carousel, Radio, Tag, Divider } from 'antd';
import { EnvironmentTwoTone } from '@ant-design/icons'

import './InfoCard.css'

const Infocard = props => {

    const info = {
        firstName: "Amal",
        age: 20,
        distance: '14',
        tags: ["sport", "singing", "Netflix", "Travel", "Dance", "swiming"],
        status: "Hey I'm looking for new frindes !",
        images: ["https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQScNAkshkRSpAWT0Qv-Mzrw5mUVSls-tGJ7g&usqp=CAU",
                "https://i.pinimg.com/474x/66/94/7d/66947da4b8bba10226afd00ae5fa7eaa.jpg",
        ]
    }

    return (
        <div className="rightSideCard">
            <div className="infoCardContainer">
                <div className="infoPage">
                    <Carousel className="carouselImgs" dotPosition={'top'}>
                        {info.images.map(image =>
                        <div className="fiximg">
                            <img className="imgCard" src={image}/>
                        </div>
                        )
                        }
                    </Carousel>
                    <div className="rowboxCard" style={{marginTop: '15px'}}>
                        <h2 className="fisrtNameCard"> {info.firstName}</h2>
                        <h4 style={{margin: '10px'}} className="smallfontCard">{info.age}</h4>
                    </div>
                    <div className="rowboxCard">
                        <EnvironmentTwoTone style={{fontSize: '1.7rem'}} />
                        <h4 className="smallfontCard" style={{color: '#a3a3a3'}}>{info.distance} kilometers away</h4>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'space-between', marginRight: '15px', marginLeft:'15px'}}>
                        {info.tags.map(tag =><Tag color="blue" style={{height: "25px", width:"70px", fontSize:'120%', marginTop: '5px'}}>{tag}</Tag>)}
                    </div>
                    <Divider orientation="center">Status</Divider>
                    <div className="rowboxCard">
                        <h4 style={{color: '#939292', fontSize: '1.4rem'}}>{info.status}</h4>
                    </div>
                    <Divider/>
                </div>
            </div>
        </div>
    )
}

export default Infocard
