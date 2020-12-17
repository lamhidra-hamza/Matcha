import React, { useState } from "react";
import "./EditProfile.scss";
import ProfileImgItem from "../profileImgItem/profileImgItem";
import ProfileImgEmpty from "../profileImgIEmpty/profileImgIEmpty";
import { Slider, Input, Select, Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {uploadPictures} from "../../tools/globalFunctions";

export default function EditProfile(props) {
  const currentView = props && props.mobile ? "mobile" : "";
  const [images, setImages] = useState([
    {
      preview: null,
      file: null,
    },
    {
      preview: null,
      file: null,
    },
    {
      preview: null,
      file: null,
    },
    {
      preview: null,
      file: null,
    },
    {
      preview: null,
      file: null,
    },
  ]);

  const [imageLink, setImageLink] = useState(["", "", "", "", ""]);

  const RenderProfileImage = ({ index }) => {
    if (images[index].preview) {
      return (
        <ProfileImgItem
          key={index}
          view={currentView}
          link={images[index].preview}
          id={index}
          clear={() => clearImage(index)}
        />
      );
    }
    if (imageLink[index]) {
      return (
        <ProfileImgItem
          key={index}
          view={currentView}
          link={imageLink[index]}
          id={index}
          clear={() => clearImage(index)}
        />
      );
    }
    return (
      <ProfileImgEmpty
        key={index}
        view={`${currentView}`}
        id={index}
        add={(preview, file) => addNewImage(preview, file, index)}
      />
    );
  };

  const addNewImage = async (preview, file, index) => {
    console.log(`the index is ${index}`);
    let newImages = [...images];
    newImages[index].preview = preview;
    newImages[index].file = file;
    setImages(newImages);
  };

  const clearImage = (index) => {
    let newImages = [...images];
    let newImagesLink = [...imageLink];

    newImages[index] = { preview: null, file: null };
    newImagesLink[index] = "";
    setImages(newImages);
    setImageLink(newImagesLink);
  };

  const history = useHistory();

  const { Option } = Select;

  const saveButtonClick = async () => {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    images.map((image) => {
      if (image.file) formData.append("image", image.file);
    });
    await uploadPictures(formData);
    history.goBack();
  };

  const handleChange = () => {
    console.log("done!!");
  };

  return (
    <div className={`${currentView}editProfileContainer`}>
      <div className="editProfileCard">
        <div className="EditProfileInfo">
          <div className="profileImgs">
            <RenderProfileImage index={0} />
            <RenderProfileImage index={1} />
            <RenderProfileImage index={2} />
            <RenderProfileImage index={3} />
            <RenderProfileImage index={4} />
          </div>
          <div className="profileInfoConatainer">
            <div className="accountSet">
              <h2 className="setTitle">ACCOUNT SETTINGS</h2>
              <div className="setBox rowsetBox">
                <h3 className="boxParam">Email</h3>

                <Input
                  placeholder="amal@gmail.com"
                  style={{
                    height: "2vh",
                    borderRadius: "10px",
                    width: "200px",
                    border: "0px",
                    textAlign: "right",
                  }}
                />
              </div>
              <div className="setBox borderTopNone rowsetBox">
                <h3 className="boxParam">Password</h3>
                <Input
                  placeholder="........"
                  style={{
                    height: "2vh",
                    borderRadius: "10px",
                    width: "200px",
                    border: "0px",
                    textAlign: "right",
                  }}
                />
              </div>
              <div className="setBox borderTopNone rowsetBox">
                <h3 className="boxParam">First Name</h3>
                <Input
                  placeholder="Amal"
                  style={{
                    height: "2vh",
                    borderRadius: "10px",
                    width: "200px",
                    border: "0px",
                    textAlign: "right",
                  }}
                />
              </div>
              <div className="setBox borderTopNone rowsetBox">
                <h3 className="boxParam">Last Name</h3>
                <Input
                  placeholder="bentbaha"
                  style={{
                    height: "2vh",
                    borderRadius: "10px",
                    width: "200px",
                    border: "0px",
                    textAlign: "right",
                  }}
                />
              </div>
            </div>
            <div className="accountSet">
              <h2 className="setTitle">DISCOVERY SETTINGS</h2>
              <div className="setBox rowsetBox">
                <h3 className="boxParam">Location</h3>
                <h3 className="boxValue">Marrakech, Morocco</h3>
              </div>
              <div className="setBox columnsetBox borderTopNone">
                <div className="rowsetBox">
                  <h3 className="boxParam">Maximun Distance</h3>
                  <h3 className="boxValue">11 km.</h3>
                </div>
                <Slider defaultValue={30} />
              </div>
              <div className="setBox borderTopNone rowsetBox">
                <h3 className="boxParam">Looking for</h3>
                <Select
                  defaultValue="lucy"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="men">Men</Option>
                  <Option value="lucy">Women</Option>
                  <Option value="Yiminghe">Men & Women</Option>
                </Select>
              </div>
              <div className="setBox borderTopNone columnsetBox">
                <div className="rowsetBox">
                  <h3 className="boxParam">Age Range</h3>
                  <h3 className="boxValue">18-39</h3>
                </div>
                <Slider
                  range
                  step={1}
                  min={18}
                  max={39}
                  defaultValue={[22, 28]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="floatBtn">
          <Button
            shape="round"
            className={`${currentView}saveProfileBtn`}
            onClick={saveButtonClick}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
