import React, { Component } from 'react'
import './LoginBtn.css'
import { Button } from 'antd'

export class LoginBtn extends Component {
    render() {
        return (
            <Button className={this.props.show ? "loginBtnReverse" : "loginBtn"}>
                LOG IN
            </Button>
        )
    }
}

export default LoginBtn
