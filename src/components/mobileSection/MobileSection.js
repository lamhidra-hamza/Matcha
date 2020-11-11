import React from 'react';
import './MobileSection.css'
import { Tabs, Divider, Button } from 'antd';
import MobileProfile from '../mobileProfile/MobileProfile';
import { FireFilled, MessageFilled, ContactsFilled, HeartFilled, LogoutOutlined } from '@ant-design/icons';
import MatcheDisplay from '../matchesDisplay/MatcheDisplay';
import MessageDisplay from '../messageDisplay/MessageDisplay'

const { TabPane } = Tabs;

function MobileSection() {
    return (
        <div className="mobileSection">
          <Tabs defaultActiveKey="4">
            <TabPane className="mobileTab scrollTab" tab={<span className="mobileNavIcon"> <FireFilled /></span>} key="1" >
              <MatcheDisplay className="paddingBottomTab"/>
              <div style={{height: "100px"}}/>
            </TabPane>
            <TabPane className="mobileTab scrollTab" tab={<span className="mobileNavIcon"> <HeartFilled /></span>} key="2" >
              <MatcheDisplay/>
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
