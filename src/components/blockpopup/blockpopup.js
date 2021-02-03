import React, { useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./blockpopup.scss";
import { Modal, Button, Result } from "antd";
import { Typography } from "antd";
import { Divider } from "antd";
import BtnNoBackgrndIcon from "../btnNoBackgrndIcon/BtnNoBackgrndIcon";
import BtnApp from "../btnApp/BtnApp";
import { postData, putData } from "../../tools/globalFunctions";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { UserContext } from "../../contexts/UserContext";

const { Title, Paragraph } = Typography;

const BlockPopUp = (props) => {
  let { state, pathname } = useLocation();
  const { socket } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const handleOk = async () => {
    const myId = localStorage.getItem("userId");
    console.log("the unmatched user is ", props.block_user);
    //await postData(`api/block`, {blocked_user: id});
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
  };

  const handleMsgOk = async () => {
    console.log("the handle message ok is ");
    history.goBack();
  };

  const handleCancel = () => {
    props.show();
  };

  if (showMsg)
    return (
      <div class="unmatchpopup">
        <Modal
          visible={true}
          onOk={handleMsgOk}
          onCancel={handleMsgOk}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
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
    <div class="unmatchpopup">
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
            loading={loading}
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
