import React from 'react'
import { Divider } from 'antd'
import { Carousel } from 'antd'
import './UserInfo.scss'
import CouraselImgItem from '../carouselImgItem/CouraselImgItem'


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
          Software Developer
          <br />1 km away
        </div>
      </div>

      <div className="userAction">
        <div className="unmatch">UNMATCH</div>
        <div className="block">BLOCK</div>
      </div>
    </div>
  )
}
