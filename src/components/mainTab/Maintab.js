import React from 'react'
import { Tabs } from 'antd';
import './Maintab.css'
import MatcheDisplay from '../matchesDisplay/MatcheDisplay'
import MessageDisplay from '../messageDisplay/MessageDisplay';
import { Badge } from 'antd';
import { Redirect,  Link } from 'react-router-dom';


const { TabPane } = Tabs;

export default function Maintab() {
    return (
        <div className="tabs">
            <Tabs className="tabsstyle" defaultActiveKey="1" style={{fontWeight: '800'}}>
                <TabPane style={{ height: '100vh', width: '400px'}} tab={
                    <Link to="/app/desktop/"><span>Matches <Badge count={25} /></span> </Link> } key="1">
                    <MatcheDisplay/>
                </TabPane>
                <TabPane style={{ height: '100vh', width: '400px'}}  tab={
                <Link to="/app/desktop/chatbox"> <span>Messagees <Badge count={2} /></span> </Link> } key="2">
                    <MessageDisplay />
                </TabPane>
            </Tabs>
        </div>
    )
}
