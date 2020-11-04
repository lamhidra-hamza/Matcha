import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Content from '../../components/content/Content'

import Footer from '../../components/footer/Footer'
import './Home.css'
import Loginpopup from '../../components/loginpopup/Loginpopup'

export class Home extends Component {
  state = {
    visible: false
    
  }
  showModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
    console.log("done");
    console.log(this.state.visible);
  }

   handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div className="container">
        <div className="gradient">
          <Header showModal={this.showModal}/>
          <Content showModal={this.showModal}/>
          <div className = "center">
            <Loginpopup visible={this.state.visible} handleCancel= {this.handleCancel}/>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
