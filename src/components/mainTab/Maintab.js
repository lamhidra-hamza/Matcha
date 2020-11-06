import React from 'react'
import { Tabs } from 'antd';
import './Maintab.css'

const { TabPane } = Tabs;

export default function Maintab() {
    return (
        <div className="tabs">
            <Tabs className="tabsstyle" defaultActiveKey="1" style={{fontWeight: '800'}}>
                <TabPane tab="Matches" key="1">
                    Hello Lamhidra
                </TabPane>
                <TabPane tab="Messages" key="2">
                    Hello Hamza
                </TabPane>
            </Tabs>
        </div>
    )
}
