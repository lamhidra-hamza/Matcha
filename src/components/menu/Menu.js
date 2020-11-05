import React, { Component } from "react";
import "./Menu.css";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export class menu extends Component {
  render() {
    let btnclass = "menuX"
    let icon = <CloseOutlined className="menuIcon" />
    if (!this.props.show) {
      btnclass = "menu"
      icon = <MenuOutlined className="menuIcon" />
    }
    return (
      <div>
          <Button
            onClick={this.props.transform}
            className={btnclass}
            icon={icon}
          />
      </div>
    );
  }
}

export default menu;
