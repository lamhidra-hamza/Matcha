import React from 'react'
import { Tabs } from 'antd';
import './Mainapp.css'

const { TabPane } = Tabs;

export default function Mainapp() {
    return (
        <div className="containerMainapp">
            <div className="mainRow">
                <div className="leftSide">
                    <div className="desNavbar">
                        
                    </div>
                    <div className="tabs">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Matches" key="1">
                            Hello Lamhidra
                        </TabPane>
                        <TabPane tab="Messages" key="2">
                            Hello Hamza
                        </TabPane>
                    </Tabs>
                    </div>
                </div>
                <div className="main">
                    
                </div>
            </div>
        </div>
    )
}

