import React from 'react'
import './Mainapp.css'
import Maintab from '../components/mainTab/Maintab.js'
import NavbarApp from '../components/navbarApp/NavbarApp'
import { Avatar, Divider, Input, Button } from 'antd'
import { Carousel, Image } from 'antd'

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '100%',
  textAlign: 'center',
  background: '#364d79',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
}

export default function Mainapp() {
  return (
    <div className="containerMainapp">
      <div className="mainRow">
        <div className="leftSide">
          <NavbarApp />
          <Maintab />
        </div>
        <div className="rightSide">
          <div className="chatBox">
            <div className="chatBoxHeader">
              <div className="avatar">
                <Avatar
                  size={50}
                  src="https://static01.nyt.com/images/2020/01/13/arts/13billboard-item/13billboard-item-superJumbo.jpg"
                />
              </div>
              <div className="matchDate">
                You matched with Hinata on 50/50/3020
              </div>
            </div>
            <Divider style={{ margin: '0px', width: '100%' }} />
            <div className="chatBoxbody"></div>
            <Divider style={{ margin: '0px', width: '100%' }} />

            <div className="chatBoxInput">
              <div className="chatInput">
                <Input
                  placeholder="Type a message"
                  style={{
                    margin: '10px',
                    height: '50px',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div className="chatButton">
                <Button shape="round" className={'registerbtn'}>
                  send
                </Button>
              </div>
            </div>
          </div>
          <div className="userInfo">
            <div className="userImgs">
              <Carousel>
                <div className="userImgItem" style={contentStyle}>
                  <Image
                    width={'100%'}
                    height={'400px'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </div>
                <div style={contentStyle}>
                  <Image
                    width={'100%'}
                    height={'400px'}
                    src="https://www.essentiallysports.com/wp-content/uploads/12a68.jpg"
                  />
                </div>
                <div style={contentStyle}>
                  <Image
                    width={'100%'}
                    height={'400px'}
                    src="https://economictimes.indiatimes.com/thumb/msid-74219486,width-1200,height-900,resizemode-4,imgsize-732987/maria-sharapova-opened-up-about-the-challenge-of-adjusting-to-life-in-a-new-country-without-her-mother-.jpg?from=mdr"
                  />
                </div>
                <div style={contentStyle}>
                  <Image
                    width={'100%'}
                    height={'400px'}
                    src="https://www.mariasharapova.com/wp-content/uploads/Therabody-1.jpg"
                  />
                </div>
              </Carousel>
            </div>
            <div className="userNameInfo">
              <div className="userNameInfoName">Maria, 23</div>
              <div className="userNameInfoJob">
                Software Developer
                <br />1 km away
              </div>
              <Divider />
            </div>

            <div className="userAction">
              <div className="unmatch">unmatch</div>
              <div className="report">block</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
