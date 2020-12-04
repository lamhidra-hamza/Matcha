import React, {useState} from 'react'
import './RegisterForm.css'
import { Modal, Button } from 'antd'
import { Form, Input, Checkbox } from 'antd'


const RegisterForm = (props) => {
  const [loading, setloading] = useState(false)
  
  const getStyle = () => {
    return {
      textAlign: 'center',
      margin: '2% 4%',
      borderRadius: '50px',
      height: props.mobile ? '100vh' : '500px',
    }
  }

  return (
    <div>
      <Modal
          visible={props.visible}
          onOk={"this.handleOk"}
          onCancel={props.handleCancel}
          bodyStyle={getStyle()}
          width={props.mobile ? '100vw' : '50vw'}
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

          </div>
        </Modal>
    </div>
  )
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
