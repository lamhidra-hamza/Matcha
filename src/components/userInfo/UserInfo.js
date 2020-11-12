import React from 'react'
import { Divider } from 'antd'
import { Carousel } from 'antd'
import './UserInfo.scss'
import CouraselImgItem from '../carouselImgItem/CouraselImgItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default function ChatBox() {
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
    <div className="userInfo">
      <div style={{position: 'relative'}}>
        <Carousel dotPosition={'bottom'}>
            {info.images.map(image =>
            <div className="fiximg">
                <img alt="img-card" className="imgCard" src={image}/>
            </div>)}
        </Carousel>
      </div>
        <Divider />
      <div className="userNameInfo">
        <div className="userNameInfoName">Maria, 23</div>
        <div className="userNameInfoJob">
          <FontAwesomeIcon icon={faBriefcase} /> Software Developer
          <br />
          <FontAwesomeIcon icon={faMapMarkerAlt} /> 1 km away
        </div>
        <Divider />
        <div className="userStatus">
          Hello my name is lkadjsf sldkfjsd adksjfuwe sdfjasdf kajsdflj 🤑❤️🔥🔥
        </div>
      </div>

      <div className="userAction">
        <div className="unmatch">UNMATCH</div>
        <div className="block">BLOCK</div>
      </div>
    </div>
  )
}
