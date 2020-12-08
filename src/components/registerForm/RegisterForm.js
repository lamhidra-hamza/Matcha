import React from 'react'
import './RegisterForm.scss'
import axios from 'axios'
import {
  Modal,
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterForm = (props) => {  
  const getStyle = () => {
    return {
      textAlign: 'center',
      margin: '2% 4%',
      borderRadius: '50px',
      height: props.mobile ? '100vh' : '500px',
    }
  }

  const [form] = Form.useForm();

  const onFinish = values => {
	props.showModal(values.email);
	console.log(values)
	axios.post(`http://localhost:5000/api/users/signup`, values)
		.then(res => {
			console.log(res);
		})
  };

  return (
    <div className="registerForm">
      <Modal
          visible={props.visible}
          onOk={"this.handleOk"}
          onCancel={props.handleCancel}
          bodyStyle={getStyle()}
          width={props.mobile ? '100vw' : '50vw'}
          centered={true}
          footer = {[
            <Button key="back" onClick={props.handleCancel}></Button>,
          ]}
        >
          <div className="loginoption">
			<Form
				{...formItemLayout}
				form={form}
				name="register"
				onFinish={onFinish}
				initialValues={{
					residence: ['zhejiang', 'hangzhou', 'xihu'],
					prefix: '86',
				}}
        scrollToFirstError
				>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
					{
						type: 'email',
						message: 'The input is not valid E-mail!',
					},
					{
						required: true,
						message: 'Please input your E-mail!',
					},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="username"
					label={
					<span>
						Usename&nbsp;
						<Tooltip title="What do you want others to call you?">
						<QuestionCircleOutlined />
						</Tooltip>
					</span>
					}
					rules={[{ required: true, message: 'Please input your Usename!', whitespace: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="firstName"
					label="First Name"
					rules={[{ required: true, message: 'Please input your First Name!', whitespace: true }]} 
					>
					<Input />
				</Form.Item>
				<Form.Item
					name="lastName"
					label="Last Name"
					rules={[{ required: true,
						message: 'Please input your Last Name!',
						 whitespace: true }]} 
					>
					<Input />
				</Form.Item>
				<Form.Item style={{display: "flex", flexWrap: "wrap",justifyContent: "space-between"}}
					name="password"
					label="Password"
					rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="confirm Password"
					dependencies={['password']}
					hasFeedback
					rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
						if (!value || getFieldValue('password') === value) {
							return Promise.resolve();
						}
						return Promise.reject('The two passwords that you entered do not match!');
						},
					}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="agreement"
					valuePropName="checked"
					rules={[
					{
						validator: (_, value) =>
						value ? Promise.resolve() : Promise.reject('Should accept agreement'),
					},
					]}
					{...tailFormItemLayout}
				>
					<Checkbox>
					I have read the <a href="#">agreement</a>
					</Checkbox>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						Register
					</Button>
				</Form.Item>
				</Form>
			</div>
        </Modal>
    </div>
  );
}

export default RegisterForm
