import React, { Component } from 'react'
import './Home.css'
import {Typography, Button } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';

const { Title} = Typography

export class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="realheader">
                        <Title style={brandStyle} level={2}>Matcha</Title>
                        <div style={btnStyle}>
                            <Button ghost shape="round" size={"large"}>
                                Login
                            </Button>
                        </div>
                    </div>
                    <div className="content">
                        <h1 style={{color: '#ffffff', fontSize: '50'}} level={1}>This is New !</h1>
                        <Button shape="round" size={"large"}>
                         Subscribe Now
                        </Button>
                    </div>
                    <div className="footer">
                        Footer
                    </div>
                </div>
            </div>
        )
    }
}

const brandStyle = {
    color: '#ffffff',
    padding: '2% 5%',
}

const btnStyle={
    padding: '2% 2%'
}

export default Home
