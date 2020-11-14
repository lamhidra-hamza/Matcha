import React from 'react';
import './MobileSection.css'
import { Tabs, Divider, Button } from 'antd';
import MobileProfile from '../mobileProfile/MobileProfile';
import { FireFilled, MessageFilled, ContactsFilled, HeartFilled, LogoutOutlined } from '@ant-design/icons';
import MessageDisplay from '../messageDisplay/MessageDisplay'
import DisplayUsers from '../displayUsers/DisplayUsers'

const { TabPane } = Tabs;

function MobileSection() {
    return (
        <div className="mobileSection">
          <Tabs defaultActiveKey="4">
            <TabPane className="mobileTab" tab={<span className="mobileNavIcon"> <FireFilled /></span>} key="1" >
              <DisplayUsers/>
            </TabPane>
            <TabPane className="mobileTab scrollTab" tab={<span className="mobileNavIcon"> <HeartFilled /></span>} key="2" >
              <DisplayUsers/>
              <div style={{height: "200px", backgroundColor: '#f6f7fa'}}/>
            </TabPane>
            <TabPane className="mobileTab scrollTab" tab={<span className="mobileNavIcon"> <MessageFilled /></span>} key="3" >
              <MessageDisplay/>
            </TabPane>
            <TabPane className="mobileTab" tab={<span className="mobileNavIcon"> <ContactsFilled /></span>} key="4" >
              <MobileProfile style={{display: 'flex', justifyContent: 'center'}}/>
            </TabPane>
          </Tabs>
          <Divider style={{margin: '0', width: '70%'}}/>
          <div className="downNav">
            <Button style={{top: '-15px'}} type="primary" size="large" shape="circle" icon={<LogoutOutlined />} />
          </div>
      </div>
    )
}

export default MobileSection
