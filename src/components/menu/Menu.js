import React, { Component } from "react";
import "./Menu.css";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export class menu extends Component {
  mobileStyle = () => {
    if (!this.props.mobile) {
      return {
        width: '80px',
      }
    } else {
      return {
        width: '30px',
        margin: '0px 40px'
      }
    }
  }

  render() {
  
    let btnclass = "menu blackColor"
    let iconclass= this.props.mobile ? "menuIconMobile" : "menuIcon";
    let icon = <CloseOutlined className={iconclass} />
    
    if (!this.props.show) {
      btnclass = "menu whiteColor"
      icon = <MenuOutlined className={iconclass} />
    }

    return (
      <div>
          <Button
            onClick={this.props.transform}
            className={btnclass}
            style={this.mobileStyle()}
            icon={icon}
          />
      </div>
    );
  }
}

export default menu;
