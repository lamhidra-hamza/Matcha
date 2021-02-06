import React, { useState, useContext } from "react";
import {useHistory } from "react-router-dom";
import "./unmatchpopup.scss";
import { Modal, Button, Result } from "antd";
import { Typography } from "antd";
import { postData } from "../../tools/globalFunctions";
import { UserContext } from '../../contexts/UserContext';


const { Paragraph } = Typography;

const UnMatchPopup = (props) => {
  const { socket } = useContext(UserContext);
  const history = useHistory();
  const [loading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);


  const handleOk = async () => {
    const myId = localStorage.getItem("userId");
    //await putData(`api/matches`, { unmatched_user: props.unmatched_user });
		const result = await postData(`api/notifications`, {
			notifiedId: props.unmatched_user,
            type: "unmatch",
		})
		socket.emit("newNotification", {
			userId: myId,
			notifiedUser: props.unmatched_user,
			notifyId: result.data.id
		});
    props.showUnmatch();
    setShowMsg(true);
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
              loading={loading}
              onClick = {handleMsgOk}
              size="middle"
            >
              ok
            </Button>,
          ]}
        >
          <Result
                status="success"

            title={`The user has been unliked successfuly \n You are no longer matched with this user`}
          />
        </Modal>
      </div>
    );
  return (
    <div className="unmatchpopup">
      <Modal
        title="Unmatch with user X"
        visible={props.isVisible}
        onOk={handleOk}
        onCancel={props.showUnmatch}
        footer={[
          <Button key="back" onClick={props.showUnmatch}>
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
          When you unmatch a user, you can't text him. but you can like him any
          time as long as he likes you back. are you sure?
        </Paragraph>
      </Modal>
    </div>
  );
};

export default UnMatchPopup;
