import React, { Component } from 'react'
import { Typography } from 'antd';

const { Title } = Typography;

export class Logo extends Component {
    getStyle = () => {
        return {
            color: this.props.show ? '#2c2c2c' : '#ffffff',
            fontSize: '3rem',
            fontWeight: '700',
            marginLeft: '4%',
            marginTop: '1%',
            userSelect: 'none',
        }
    }

    render() {
        return (
            <Title style={this.getStyle()} level={2}>Matcha</Title>
        )
    }
}

export default Logo
