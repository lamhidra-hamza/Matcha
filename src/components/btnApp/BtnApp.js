import React, { Component } from 'react'
import './BtnApp.css'

//COMPONENT FOR ICONS, NO BACKGROUND

export class BtnApp extends Component {
  render() {
    return (
      <div className="BtnApp">
        <div className="app">
          <img alt="img1" style={{ width: '40px' }} src={this.props.link} />{' '}
        </div>
      </div>
    )
  }
}

export default BtnApp
