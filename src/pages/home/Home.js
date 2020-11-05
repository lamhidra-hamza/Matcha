import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Content from '../../components/content/Content'

import Footer from '../../components/footer/Footer'
import './Home.css'
import Loginpopup from '../../components/loginpopup/Loginpopup'
import Registerpopup from '../../components/registerpopup/Registerpopup'

export class Home extends Component {
  state = {
    loginVisible: false,
    registerVisible: false
  }
  showLogin = () => {
    this.setState({
       loginVisible: !this.state. loginVisible,
    });
  }

  showRegister = () => {
    this.setState({
      registerVisible: !this.state.registerVisible,
    });
  }

   handleCancel = () => {
    this.setState({ loginVisible: false, registerVisible: false })
  }

  render() {
    return (
      <div className="container">
        <div className="gradient">
          <Header showModal={this.showLogin}/>
          <Content showModal={this.showRegister}/>
          <div className = "center">
            <Loginpopup visible={this.state.loginVisible} handleCancel= {this.handleCancel} mobile = {true}/>
            <Registerpopup visible={this.state.registerVisible} handleCancel= {this.handleCancel} mobile = {true}/>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
