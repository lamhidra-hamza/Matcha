import React, { Component } from 'react'
import './RegisterForm.css'
import { Modal, Button } from 'antd'
import { Form, Input, Checkbox } from 'antd'


export class RegisterForm extends Component {
  state = {
    loading: false,
    visible: false,
    brandStyle: {},
    componentSize: 'default',
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

  onFinish = (values) => {
    console.log('Success:', values)
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


export default RegisterForm
