import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import './Home.css';
import Loginpopup from '../../components/loginpopup/Loginpopup';
import Registerpopup from '../../components/registerpopup/Registerpopup';
import RegisterForm from '../../components/registerForm/RegisterForm';
import LoginForm from '../../components/loginForm/LoginForm';
import VerifyEmailMsg from '../../components/verifyEmailMsg/verifyEmailMsg'

export class Home extends Component {
  state = {
    loginVisible: false,
    registerVisible: false,
    loginFormVisible: false,
    registerFormVisible: false,
    verifyMsgVisible: false,
    email: "",
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
            // verifyMsgVisible: true,
        });
    }

    showRegisterForm = () => {
        this.setState({
            registerFormVisible: !this.state.registerFormVisible,
            registerVisible: !this.state.registerVisible,
        });
    }

    handleCancel = () => {
        this.setState({ loginVisible: false, registerVisible: false, registerFormVisible: false , verifyMsgVisible: false})
    }

    showVerifyMsg = (email) => {
        this.setState({
            verifyMsgVisible: !this.state.verifyMsgVisible,
            registerFormVisible: !this.state.registerFormVisible,
            email: email,
        });
    }

    render() {
        return (<div className="container">
        <div className="gradient">
          <Header showModal={this.showLogin} mobile={this.props.mobile}/>
          <Content showModal={this.showRegister} mobile={this.props.mobile}/>
          <div className = "center">
            <Loginpopup visible={this.state.loginVisible} handleCancel= {this.handleCancel} mobile={this.props.mobile}/>
            <LoginForm visible={this.state.loginFormVisible} handleCancel= {this.handleCancel} mobile={this.props.mobile} />
            <RegisterForm visible={this.state.registerFormVisible} showModal={this.showVerifyMsg} handleCancel= {this.handleCancel} mobile={this.props.mobile}/>
            <Registerpopup visible={this.state.registerVisible}  showModal={this.showRegisterForm} handleCancel= {this.handleCancel} mobile={this.props.mobile}/>
            <VerifyEmailMsg visible={this.state.verifyMsgVisible} email={this.state.email} handleCancel= {this.handleCancel} mobile={this.props.mobile}/>
          </div>
          <Footer />
        </div>
      </div>
    )
}
}

export default Home