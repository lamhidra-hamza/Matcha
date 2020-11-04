import React from 'react'
import './Header.css'
import {Typography, Button } from 'antd';

const { Title} = Typography

export default function Header(props) {
    return (
        <div className="header">
            <Title style={brandStyle} level={2}>Matcha</Title>
            <Button ghost style={newstyle} className="newstyle" shape="round" onClick={props.showModal}>
                Login
            </Button>
        </div>
    )
}

const brandStyle = {
    color: '#ffffff',
    fontSize: '4vw',
    margin: '2% 4%'
}

const newstyle = {
    fontSize: '2.5vw',
    paddingBottom: '2%',
    height: '5vw',
    margin: '2% 2%',
    borderWidth: '1.5px',

}
