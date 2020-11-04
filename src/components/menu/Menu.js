import React, { Component } from 'react'
import './Menu.css'
import {Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

export class menu extends Component {
    render() {
        return (
            <div>
                {this.props.show ?
                <Button
                    onClick={this.props.transform}
                    className="menuX"
                    icon={<CloseOutlined className="menuIcon"/>}
                    /> :
                <Button
                    onClick={this.props.transform}
                    className="menu"
                    icon={<MenuOutlined className="menuIcon"/>}
                    />
                }
            </div>
        )
    }
}

export default menu
