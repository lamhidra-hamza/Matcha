import React, { Component } from "react";
import "./Header.css";
import Menu from "../menu/Menu.js";
import Logo from "../logo/Logo.js";
import LoginBtn from "../login/LoginBtn.js";

export class Header extends Component {
  state = {
    show: false,
  };

  getstyle = () => {
    if (this.state.show) {
      return {
        borderBottomStyle: 'solid',
        borderBottomColor: '#e5e3e3',
        borderRightStyle: 'solid',
        borderRightColor: '#e5e3e3',
        borderBottomWidth: '1px',
        borderRightWidth: '1px'
      }
    }
  }

  transform = () => {
    this.setState({ show: !this.state.show });
  };

  headerback = () => {
    return {
      background: this.state.show ? "#fff" : "none",
    };
  };
  
  render() {
    return (
      <div>
        <div style={this.headerback()} className="header">
          <div className="header1" style={this.getstyle()}>
            <Logo mobile={this.props.mobile} show={this.state.show} />
            <div style={{margin: '40px 0px'}}>
              {this.props.mobile ? '' : 
                <LoginBtn show={this.state.show} showModal={this.props.showModal}
                />}
            </div>
          </div>
          <div style={{margin: this.props.mobile ? '22px 4px' : '39px 4px'}}>
            <Menu
              mobile={this.props.mobile}
              show={this.state.show}
              transform={this.transform} />
          </div>
        </div>
        {this.state.show ?
        <nav className="layoutTrans"> </nav>
          : '' }
      </div>
    );
  }
}

export default Header;
