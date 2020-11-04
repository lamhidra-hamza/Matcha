import React from 'react'
import {Button } from 'antd';
import './Content.css'

export default function Content() {
    return (
        <div className="content">
            <h1 className="contentText">This is New !</h1>
            <Button shape="round" className="registerbtn">
                REGISTER NOW
            </Button>
        </div>
    )
}
