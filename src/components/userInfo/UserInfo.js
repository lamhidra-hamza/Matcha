import React from 'react'
import { Divider } from 'antd'
import { Carousel } from 'antd'
import './UserInfo.scss'
import CouraselImgItem from '../carouselImgItem/CouraselImgItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default function ChatBox() {
  return (
    <div className="userInfo">
      <div className="userImgs">
        <Carousel>
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <CouraselImgItem link="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        </Carousel>
        <Divider />
      </div>
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
