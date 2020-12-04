import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';

import Footer from '../../components/footer/Footer';
import './Home.css';
import Loginpopup from '../../components/loginpopup/Loginpopup';
import Registerpopup from '../../components/registerpopup/Registerpopup';
import RegisterForm from '../../components/registerForm/RegisterForm';
import LoginForm from '../../components/loginForm/LoginForm';

export class Home extends Component {
  state = {
    loginVisible: false,
    registerVisible: false,
    loginFormVisible: true,
  }
  showLogin = () => {
    this.setState({
       loginVisible: !this.state.loginVisible
    });
  }

  showLoginForm = () => {
    this.setState({
      loginFormVisible : !this.state.loginFormVisible
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
          <Header showModal={this.showLogin} mobile={this.props.mobile}/>
          <Content showModal={this.showRegister} mobile={this.props.mobile}/>
          <div className = "center">
            <Loginpopup visible={this.state.loginVisible} handleCancel= {this.handleCancel} mobile={this.props.mobile}/>
            <Registerpopup visible={this.state.registerVisible} handleCancel= {this.handleCancel} mobile={this.props.mobile}/>
            {/* <RegisterForm visible={this.state.registerVisible} handleCancel= {this.handleCancel} mobile={this.props.mobile}/> */}
            <LoginForm visible={this.state.loginFormVisible} handleCancel= {this.handleCancel} mobile={this.props.mobile} />
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
