import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./profileImgEmpty.scss";

export default function ProfileImgEmpty(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      props.add(URL.createObjectURL(e.target.files[0]), e.target.files[0]);
    }
  };

  return (
    <div className={`${props.view}profileImgEmpty`}>
      <div className="id">{props.id + 1}</div>
      <div className="add">
        <div>
          <label htmlFor="upload-button">
            {image.preview ? (
              <img src={image.preview} alt="dummy" width="300" height="300" />
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} color="#ffffff" />
              </>
            )}
          </label>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <br />
        </div>
      </div>
    </div>
  );
}
