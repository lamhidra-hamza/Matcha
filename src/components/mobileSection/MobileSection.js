import React from 'react';
import './MobileSection.css'
import { Tabs } from 'antd';
import MobileProfile from '../components/mobileProfile/MobileProfile';
import { FireFilled, MessageFilled, ContactsFilled, HeartFilled } from '@ant-design/icons';
import MatcheDisplay from '../components/matchesDisplay/MatcheDisplay';
import MessageDisplay from '../components/messageDisplay/MessageDisplay'

const { TabPane } = Tabs;

function MobileSection() {
    return (
        <div className="mobileSection">
          <Tabs defaultActiveKey="4">
            <TabPane className="mobileTab" tab={<span className="mobileNavIcon"> <FireFilled /></span>} key="1" >
              <MatcheDisplay/>
            </TabPane>
            <TabPane className="mobileTab" tab={<span className="mobileNavIcon"> <HeartFilled /></span>} key="2" >
              <MatcheDisplay/>
            </TabPane>
            <TabPane className="mobileTab" tab={<span className="mobileNavIcon"> <MessageFilled /></span>} key="3" >
              <MessageDisplay/>
            </TabPane>
            <TabPane className="mobileTab" tab={<span className="mobileNavIcon"> <ContactsFilled /></span>} key="4" >
              <MobileProfile style={{display: 'flex', justifyContent: 'center'}}/>
            </TabPane>
          </Tabs>
      </div>
    )
}

export default MobileSection
