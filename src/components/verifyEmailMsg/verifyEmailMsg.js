import React from 'react';
import { Result, Modal } from 'antd';


const verifyEmailMsg = (props) => {
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
                onCancel={props.handleCancel}
                bodyStyle={getStyle()}
                width={props.mobile ? '100vw' : '50vw'}
                centered={true}
                footer={[
                ]}
                >
                <div>
                    <Result
                        title={`Please go to your email: ${props.email} address  to verify your account ...`}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default verifyEmailMsg
