import { message } from "antd";
import React, { useEffect, useState } from "react";
import "./MessageSent.scss";

const MessageSent = (props) => {
  const [time, setTime] = useState("");

  const getDayString = (dateNow, messageTime) => {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
   let minutes = '0' + messageTime.getMinutes();
   minutes = minutes.substring(minutes.length - 2, minutes.length);
    const difference = new Date(dateNow - messageTime);
   
    if (difference.getDay() < 1)
      return `${messageTime.getHours()}:${minutes}`;
    if (difference.getDay() < 2)
      return `Yesterday ${messageTime.getHours()}:${minutes}`;
    if (difference.getDay() < 7)
      return `${
        days[messageTime.getDay()]
      } ${messageTime.getHours()}:${minutes}`;
    if (difference.getMonth() < 12)
      return `${[months[messageTime.getMonth()]]},${
        days[messageTime.getDay()]
      } ${messageTime.getHours()}:${minutes}`;
    return `${messageTime.getFullYear()},${[months[messageTime.getMonth()]]} ${
      days[messageTime.getDay()]
    }  ${messageTime.getHours()}:${minutes}`;
  };

  useEffect(() => {
    const messageTime = new Date(Date.parse(props.message.date));
    const dateNow = new Date(Date.now());
    const difference = new Date(dateNow - messageTime);
    setTime(getDayString(dateNow, messageTime));
    
  }, []);

  return (
    <div className="messageSentComponent">
      <div className="messageSent">
        <div className="messageSentContent">
          <span>{props.message.content}</span>
        </div>
      </div>
      <div className="messageSentInfo">
        <div className="messageSentTime" >
          <span>{time}</span>
        </div>
      </div>
      </div>
  );
};

export default MessageSent;
