import React from 'react'
import { Button } from 'antd'
import './Content.css'

export default function Content(props) {
    return (
        <div className="content">
            <h1 className="contentText">This is New !</h1>
            <Button shape="round" className="registerbtn" onClick={props.showModal}>
                REGISTER NOW
            </Button>
        </div>
    )
}
