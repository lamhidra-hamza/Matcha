import React, { Component } from "react";
import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import "./Home.css";
import Loginpopup from "../../components/loginpopup/Loginpopup";
import Registerpopup from "../../components/registerpopup/Registerpopup";
import RegisterForm from "../../components/registerForm/RegisterForm";
import LoginForm from "../../components/loginForm/LoginForm";
import PasswordForgot from "../../components/passwordRecoverForm/PasswordForgot";
import VerifyEmailMsg from "../../components/verifyEmailMsg/verifyEmailMsg";
import PasswordRecovery from "../../components/passwordRecovery/passwordRecovery";
import axios from "axios";

export class Home extends Component {

  async componentDidMount() {
    // console.log('Component did mount!');
    // const result = await fetch('http://localhost:5000/api/firstcheck', { credentials: 'include' },{
    //   method: "GET",
    // });
    // console.log(result);
 }

  state = {
    loginVisible: false,
    loginFormVisible: false,
    registerVisible: false,
    verifyMsgVisible: false,
    registerFormVisible: false,
    forgotPassword: false,
    forgotPasswordMsg: false,
    email: "",
  };

  showLogin = () => {
    this.setState({
      loginVisible: !this.state.loginVisible,
    });
  };

  showLoginForm = () => {
    this.setState({
      loginFormVisible: !this.state.loginFormVisible,
    });
  };

  showPasswordForgot = () => {
    this.setState({
      forgotPassword: !this.state.forgotPassword,
    });
  };

  showForgotPasswordMsg = (email) => {
    this.setState({
      forgotPasswordMsg: !this.state.forgotPasswordMsg,
      forgotPassword: !this.state.forgotPassword,
      email: email,
    });
  };

  showRegisterForm = () => {
    this.setState({
      registerFormVisible: !this.state.registerFormVisible,
      registerVisible: !this.state.registerVisible,
    });
  };

  showRegister = () => {
    this.setState({
      registerVisible: !this.state.registerVisible,
    });
  };

  handleCancel = () => {
    this.setState({
      loginVisible: false,
      registerVisible: false,
      registerFormVisible: false,
      loginFormVisible: false,
      forgotPassword: false,
      verifyMsgVisible: false,
      forgotPasswordMsg: false,
    });
  };

  showVerifyMsg = (email) => {
    this.setState({
      verifyMsgVisible: !this.state.verifyMsgVisible,
      registerFormVisible: !this.state.registerFormVisible,
      email: email,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="gradient">
          <Header showModal={this.showLogin} mobile={this.props.mobile} />
          <Content showModal={this.showRegister} mobile={this.props.mobile} />
          <div className="center">
            <Loginpopup
              visible={this.state.loginVisible}
              showLgnForm={this.showLoginForm}
              handleCancel={this.handleCancel}
              mobile={this.props.mobile}
            />
            <LoginForm
              visible={this.state.loginFormVisible}
              showPasswordForgot={this.showPasswordForgot}
              handleCancel={this.handleCancel}
              mobile={this.props.mobile}
            />
            <PasswordForgot
              visible={this.state.forgotPassword}
              showModal={this.showForgotPasswordMsg}
              handleCancel={this.handleCancel}
              mobile={this.props.mobile}
            />
            <PasswordRecovery
              visible={this.state.forgotPasswordMsg}
              email={this.state.email}
              handleCancel={this.handleCancel}
              mobile={this.props.mobile}
            />
            <RegisterForm
              visible={this.state.registerFormVisible}
              showModal={this.showVerifyMsg}
              handleCancel={this.handleCancel}
              mobile={this.props.mobile}
            />
            <Registerpopup
              visible={this.state.registerVisible}
              showModal={this.showRegisterForm}
              handleCancel={this.handleCancel}
              mobile={this.props.mobile}
            />
            <VerifyEmailMsg
              visible={this.state.verifyMsgVisible}
              email={this.state.email}
              handleCancel={this.handleCancel}
              mobile={this.props.mobile}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;
