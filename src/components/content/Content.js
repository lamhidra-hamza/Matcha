import React from 'react'
import {Button } from 'antd';
import './Content.css'

export default function Content() {
    return (
        <div className="content">
            <h1 style={{color: '#ffffff', fontSize: '50'}} level={1}>This is New !</h1>
            <Button shape="round" className="registerbtn" size={"large"}>
                Register Now
            </Button>
        </div>
    )
}
