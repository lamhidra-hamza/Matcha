import React, { Component } from 'react'
import './Header.css'
import Menu from '../menu/Menu.js'
import Logo from  '../logo/Logo.js'
import LoginBtn from '../login/LoginBtn.js';

export class Header extends Component {
    state = {
        show: false,
    }

    transform = () => {
        this.setState({show: !this.state.show})
    }

    headerback = () => {
        return {
            background: this.state.show ? '#fff' : 'none',
        }
    }

    render() {
        return (
            <div>
                <div style={this.headerback()} className="header">
                    <Logo show={this.state.show}/>
                    <div>
                        <LoginBtn show={this.state.show}/>
                        <Menu show={this.state.show} transform={this.transform}/>
                    </div>
                </div>
               {/* <div className="layoutTrans"> </div> */}
            </div>
        )
    }
}

export default Header

