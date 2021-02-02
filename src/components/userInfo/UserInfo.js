import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { Carousel } from "antd";
import "./UserInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { calculate_age } from "../../tools/globalFunctions";
import { SER } from "../../conf/config";


export default function UserInfo(props) {
  
  const [images, setImages] = useState([]);
  const [showUnmatchModel, setShowUnmatchModel] = useState(false);
  
  useEffect(() => {
    console.log("useEffect for userInfo");
    let imageArray = [];
    for (const [key, value] of Object.entries(props.matchedUser)) {
      console.log(`${key}: ${value}`);
      if (key.includes("picture") && value)
        imageArray.push(value);
    }
    console.log("the images array array", imageArray);
    setImages(imageArray);
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
            <div>
              <img alt="img-card" style={contentStyle} src={`${SER.PicPath}/${image}`}/>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="userNameInfo">
        <div className="userNameInfoName">
          {props.matchedUser.firstName.charAt(0).toUpperCase() +
            props.matchedUser.firstName.slice(1)}
          , {calculate_age(props.matchedUser.date)}
        </div>
        <div className="userNameInfoJob">
          <FontAwesomeIcon icon={faBriefcase} /> {props.matchedUser.job}
          <br />
          <FontAwesomeIcon icon={faMapMarkerAlt} /> 1 km away
          <Divider />
        </div>
        <div className="userStatus">{props.matchedUser.biography} </div>
      </div>

      <div className="userAction">
        <div className="unmatch">UNMATCH</div>
        <div className="block">BLOCK</div>
      </div>
    </div>
  );
}
