import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./unmatchpopup.scss";
import { Modal, Button, Result } from "antd";
import { Typography } from "antd";
import { Divider } from "antd";
import BtnNoBackgrndIcon from "../btnNoBackgrndIcon/BtnNoBackgrndIcon";
import BtnApp from "../btnApp/BtnApp";
import { putData } from "../../tools/globalFunctions";
import { CheckCircleTwoTone } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const UnMatchPopup = (props) => {
  let { state, pathname } = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);


  const handleOk = async () => {
    console.log("the unmatched user is ", props.unmatched_user);
    //await putData(`api/matches`, { unmatched_user: props.unmatched_user });
    props.show();
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
              onClick = {handleMsgOk}
              size="middle"
            >
              ok
            </Button>,
          ]}
        >
          <Result
            title={`The user has been unliked successfuly \n You are no longer matched with this user`}
          />
        </Modal>
      </div>
    );
  return (
    <div class="unmatchpopup">
      <Modal
        title="Unmatch with user X"
        visible={props.isVisible}
        onOk={handleOk}
        onCancel={props.show}
        footer={[
          <Button key="back" onClick={props.show}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Unmatch
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

export default UnMatchPopup;
