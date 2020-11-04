import React, { Component } from 'react'
import './LoginBtn.css'
import Loginpopup from '../loginpopup/Loginpopup'


const ComponentOne = () => <div>Hello world!</div>;

export class LoginBtn extends Component {

  render() {
    return (
      <div className="LoginBtn">
          <Loginpopup popupcontent = {<ComponentOne />} />
      </div>
    )
  }
}

export default LoginBtn;
