import React, { Component } from 'react'
import { Typography } from 'antd';

const { Title } = Typography;

export class Logo extends Component {
    getStyle = () => {
        return {
            color: this.props.show ? '#2c2c2c' : '#ffffff',
            fontSize: this.props.mobile ? '2rem' : '3rem',
            fontWeight: '700',
            marginLeft: this.props.mobile ? '30px' :'40px',
            marginTop: this.props.mobile ? '15px' : '25px',
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
