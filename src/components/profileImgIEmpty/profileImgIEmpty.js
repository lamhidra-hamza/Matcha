import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./profileImgEmpty.scss";

export default function ProfileImgEmpty(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      // setImage({
      //   preview: URL.createObjectURL(e.target.files[0]),
      //   raw: e.target.files[0],
      // });
      props.add(URL.createObjectURL(e.target.files[0]), e.target.files[0]);
    }
  };

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", image.raw);

  //   await fetch("YOUR_URL", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     body: formData,
  //   });
  // };

  return (
    <div className={`${props.view}profileImgEmpty`}>
      <div className="id">{props.id + 1}</div>
      <div className="add">
        {/* TEST TEST TEST TEST TSET TEST */}
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
