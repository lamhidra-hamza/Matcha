import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { Carousel, Rate } from "antd";
import "./UserInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { calculate_age } from "../../tools/globalFunctions";
import { SER } from "../../conf/config";


export default function UserInfo(props) {
  
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    let imageArray = [];
    for (const [key, value] of Object.entries(props.matchedUser)) {
      if (key.includes("picture") && value)
        imageArray.push(value);
    }
    setImages(imageArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contentStyle = {
    height: "450px",
    width: "100%",
    color: "#fff",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div className="userInfo">
      <div className="fiximg">
        <Carousel>
          {images.map((image) => (
            <div key = {image}>
              <img alt="img-card" style={contentStyle} src={`${SER.PicPath}/${image}`}/>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="userNameInfo">
        <div className="userNameInfoName">
          {props.matchedUser.firstName.charAt(0).toUpperCase() +
            props.matchedUser.firstName.slice(1)}
          , {calculate_age(props.matchedUser.bornDate)}
        </div>
        <div className="userNameInfoJob">
          Fame Rate : <Rate allowHalf defaultValue={props.matchedUser.frameRate / 20} disabled />
          <br />
          <FontAwesomeIcon icon={faBriefcase} /> {props.matchedUser.job}
          <br />
          <FontAwesomeIcon icon={faMapMarkerAlt} /> 1 km away
          <Divider />
        </div>
        <div className="userStatus">{props.matchedUser.biography} </div>
      </div>

      <div className="userAction">
        <div className="unmatch" onClick = {props.showUnmatch}>UNMATCH</div>
        <div className="block" onClick = {props.showBlock}>BLOCK</div>
      </div>
    </div>
  );
}
