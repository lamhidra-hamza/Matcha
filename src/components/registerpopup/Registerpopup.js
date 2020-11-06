import React, { Component } from 'react'
import './Registerpopup.css'
import { Modal, Button } from 'antd'
import { Typography } from 'antd'
import { Divider } from 'antd'
import BtnNoBackgrndIcon from '../btnNoBackgrndIcon/BtnNoBackgrndIcon'
import BtnApp from '../btnApp/BtnApp'

const { Title, Paragraph } = Typography

export class Registerpopup extends Component {
  state = {
    loading: false,
    visible: false
  }

  getStyle = () => {
    return {
      textAlign: 'center',
      margin: '2% 4%',
      borderRadius: '50px',
      height: this.props.mobile ? '100vh' : '500px',
    }
  }

  handleOk = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }
  render() {
    const { loading } = this.state
    return (
      <div>
        <Modal
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.props.handleCancel}
          bodyStyle={this.getStyle()}
          width={this.props.mobile ? '100vw' : '50vw'}
          centered={true}
          //width = {'100vw'}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}></Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            ></Button>,
          ]}
        >
          <div className="loginoption">
            <Title level={3}>CREATE ACCOUNT</Title>
            <Paragraph>
              By clicking Log In, you agree to our Terms, Learn how we precess
              you data in our Privacy Policy, and Cookie Policy.
            </Paragraph>

            <BtnNoBackgrndIcon link="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png" />
            <BtnNoBackgrndIcon link="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png" />
            <BtnNoBackgrndIcon link="https://cdn0.iconfinder.com/data/icons/social-media-2071/100/social-02-256.png" />

            <div>Trouble Logging In?</div>
            <Divider />
            <Title level={3}>GET THE APP</Title>
            <div className="appsLogos">
              <BtnApp link="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_apple_ios-256.png" />
              <BtnApp link="https://cdn3.iconfinder.com/data/icons/google-suits-1/32/12_play_store_google_android_game_service_marketplace-256.png" />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}


export default Registerpopup
