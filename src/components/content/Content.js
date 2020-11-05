import { Button } from 'antd'
import './Content.css'

import React, { Component } from 'react'

export class Content extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="contentText">This is New !</h1>
                <Button
                    shape="round"
                    className={this.props.mobile ? "registerbtnMobile" : "registerbtn" }
                    onClick={this.props.showModal}>
                    REGISTER NOW
                </Button>
                {this.props.mobile ? <div className='loginMobile'><span>LOG IN</span> </div>: ''}
            </div>
        )
    }
}

export default Content