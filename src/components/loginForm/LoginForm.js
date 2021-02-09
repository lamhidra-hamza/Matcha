import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import { Modal, Form, Input, Button } from "antd";
import axios from "axios";

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

const LoginForm = (props) => {
  const [loading, setloading] = useState(false);
  const history = useHistory();


  const getStyle = () => {
    return {
      textAlign: "center",
      margin: "2% 4%",
      borderRadius: "50px",
      height: props.mobile ? "100vh" : "500px",
    };
  };

  const [form] = Form.useForm();

  //fetch functions
  const onFinish = async (values) => {
    setloading(true);
    try {
      const result = await axios.post(
      "http://localhost:5000/api/users/signin",
      {
        email: values.email,
        password: values.password,
      },
      {
        withCredentials: true,
      }
    );
    await localStorage.setItem("accessToken", result.data.accessToken);
    await localStorage.setItem("userId", result.data.id);
    if (result && result.data.status === 1) {
      history.push("/app");
    }
  }
    catch(err){
      setloading(false);
    }
    
  };

  return (
    <div>
      <Modal
        visible={props.visible}
        onOk={"this.handleOk"}
        onCancel={props.handleCancel}
        bodyStyle={getStyle()}
        width={props.mobile ? "100vw" : "50vw"}
        centered={true}
        footer={[
          <Button key="back" onClick={props.handleCancel}></Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={"this.handleOk"}
          ></Button>,
        ]}
      >
        <div className="loginoption">
          <span className="header">Login</span>
          <br />
          <br />
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={props.showPasswordForgot} type="text">
            <span className="styled">Trouble Loggin In? </span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
