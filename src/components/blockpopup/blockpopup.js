import React, { useState, useContext } from "react";
import {useHistory } from "react-router-dom";
import "./blockpopup.scss";
import { Modal, Button, Result, message } from "antd";
import { Typography } from "antd";

import { postData } from "../../tools/globalFunctions";
import { UserContext } from "../../contexts/UserContext";

const {Paragraph } = Typography;

const BlockPopUp = (props) => {
  const { socket } = useContext(UserContext);
  const history = useHistory();
  const [showMsg, setShowMsg] = useState(false);

  const handleOk = async () => {
    try {
      const myId = localStorage.getItem("userId");
      await postData(`api/block`, {blocked_user: props.block_user});
      const result = await postData(`api/notifications`, {
        notifiedId: props.block_user,
        type: "block",
      });
      socket.emit("newNotification", {
        userId: myId,
        notifiedUser: props.block_user,
        notifyId: result.data.id,
      });
      props.showBlock();
      setShowMsg(true);
    } catch (err) {
      message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
    }
  };

  const handleMsgOk = async () => {
    history.goBack();
  };

  if (showMsg)
    return (
      <div className="unmatchpopup">
        <Modal
          visible={true}
          onOk={handleMsgOk}
          onCancel={handleMsgOk}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={false}
              onClick={handleMsgOk}
              size="middle"
            >
              ok
            </Button>,
          ]}
        >
          <Result
            status="success"
            title={`The user has been blocked successfuly \n he/she can iteracte with you`}
          />
        </Modal>
      </div>
    );
  return (
    <div className="unmatchpopup">
      <Modal
        title="Block user"
        visible={props.isVisible}
        onOk={handleOk}
        onCancel={props.showBlock}
        footer={[
          <Button key="back" onClick={props.showBlock}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={handleOk}
          >
            block
          </Button>,
        ]}
      >
        <Paragraph>
          When you block a user, you can't text him. but you can like him any
          time as long as he likes you back. are you sure?
        </Paragraph>
      </Modal>
    </div>
  );
};

export default BlockPopUp;
