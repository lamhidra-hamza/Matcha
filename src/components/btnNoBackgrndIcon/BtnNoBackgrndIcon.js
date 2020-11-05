import React, { Component } from 'react'
import './BtnNoBackgrndIcon.css'

//COMPONENT WITH NO BACKGROUND ICON ON THE LEFT SIDE

export class BtnNoBackgrndIcon extends Component {
  render() {
    return (
      <div className="BtnNoBackgrndIcon">
        <div className="loginButton">
              <img
                alt="img2"
                style={{ width: '30px' }}
                src={
                  this.props.link
                }
              />
              <span>LOG IN WITH GOOGLE</span>
            </div>
      </div>
    )
  }
}

export default BtnNoBackgrndIcon;
