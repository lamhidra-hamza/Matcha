import React from "react";
import "./RegisterForm.scss";
import axios from "axios";
import {
  Modal,
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
  DatePicker,
  message
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { SER } from "../../conf/config";
import moment from "moment";

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
      textAlign: "center",
      margin: "2% 4%",
      borderRadius: "50px",
      height: props.mobile ? "100vh" : "500px",
    };
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      if (values?.bornDate)
        values.bornDate = moment(values.bornDate).format("DD-MM-YYYY");
      await axios.post(`${SER.HOST}/api/users/signup`, values);
      props.showModal(values.email);
    } catch (err) {
      message.error(err?.response?.data?.msg ? err.response.data.msg : "Something Wrong !");
    }
  };

  const checkAge = (value) => {
    if (moment().year() - moment(value).year() > 18) return true;
    return false;
  };

  return (
    <div className="registerForm">
      <Modal
        visible={props.visible}
        onOk={"this.handleOk"}
        onCancel={props.handleCancel}
        bodyStyle={getStyle()}
        width={props.mobile ? "100vw" : "50vw"}
        centered={true}
        footer={null}
      >
        <div className="loginoption">
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
                  required: true,
                  message: "Please input your E-mail!",
                },
                {
                  //eslint-disable-next-line
                  pattern: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
                  max: 250,
                  message: "please enter a valid Email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label={
                <span>
                  Username&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
                {
                  //eslint-disable-next-line
                  pattern: /^[a-zA-Z0-9]+$/,
                  max: 100,
                  min: 3,
                  message: "please enter a valid Username",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                },
                {
                  //eslint-disable-next-line
                  pattern: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
                  message: "please enter a valid Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                },
                {
                  //eslint-disable-next-line
                  pattern: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
                  message: "please enter a valid Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="bornDate"
              label="Born Date"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || checkAge(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "You should have 18 years Old to sign-up"
                    );
                  },
                }),
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  //eslint-disable-next-line
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Minimum eight characters, at least one letter and one number",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
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
                    value
                      ? Promise.resolve()
                      : Promise.reject("Should accept agreement"),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="/">agreement</a>
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
};

export default RegisterForm;
