import React, { useState, useEffect, useContext } from "react";
import "./ProfileInfo.scss";
import LikeViewItems from "../likeAndView/LikeViewItems";
import { Slider, Input, Select, Button, message, Switch } from "antd";
import { useHistory } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { UserContext } from "../../contexts/UserContext";
import { AutoComplete } from "antd";

const citiesData = require("../../locationData/cities.json");
const countriesData = require("../../locationData/countries.json");

const { Option } = Select;

const ProfileInfo = (props) => {
  const {
    user,
    setUser,
    userLocation,
    setUserLocation,
    realCoordinates,
  } = useContext(UserContext);
  const [newUser, setNewUser] = useState({ ...user });
  const [coords, setCoords] = useState({
    ...userLocation,
    real_location: userLocation.real_location == 1 ? true : false,
  });
  const [cities, setCities] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  let errorMessage = [];

  const interestingChange = (value) => {
    setNewUser({ ...newUser, interessted: value });
  };

  const saveButtonClick = () => {
    const emailRegex = new RegExp(
      /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/
    );
    const NameRegex = new RegExp(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i);
    const passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

    console.log("the password is", newUser.password);
    if (!emailRegex.test(newUser.email))
      errorMessage.push("please enter a valid email");
    if (!NameRegex.test(newUser.firstName))
      errorMessage.push("please enter a valid First Name");
    if (!NameRegex.test(newUser.lastName))
      errorMessage.push("please enter a valid Last Name");
    if ((newUser.password && newUser.password.length > 0) && !passRegex.test(newUser.password))
      errorMessage.push("Minimum eight characters, at least one letter and one number");
    if ((newUser.password && newUser.password.length > 0) && newUser.password !== password)
      errorMessage.push("The two passwords that you entered do not match! ")
    if (errorMessage.length == 0) {
      history.goBack();
      update();
      setUser(newUser);
    } else {
      errorMessage.map(element => message.warning(element));
      errorMessage = [];
    }
  };

  const handelEmailChange = ({ target: { value } }) => {
    setNewUser({ ...newUser, email: value });
  };

  const handelPassChange = ({ target: { value } }) => {
    setNewUser({ ...newUser, password: value });
  };

  const handelRePassChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handelFirstChange = ({ target: { value } }) => {
    setNewUser({ ...newUser, firstName: value });
  };

  const handelLastChange = ({ target: { value } }) => {
    setNewUser({ ...newUser, lastName: value });
  };

  const AgeRangeChange = (range) => {
    setNewUser({ ...newUser, minAge: range[0], maxAge: range[1] });
  };

  const handelDistanceChange = (dis) => {
    setNewUser({ ...newUser, maxDistance: dis });
  };

  const handelRealLocationChange = async () => {
    if (coords.real_location) {
      setCoords({
        ...coords,
        real_location: false,
      });
    } else {
      setCoords({
        real_location: true,
        longitude: realCoordinates.longitude,
        latitude: realCoordinates.latitude,
        location_name: realCoordinates.location_name,
      });
    }
  };

  const handleSearch = (value) => {
    let res = [];
    setUserCity(value);
    if (value.length == 0) {
      setCities([]);
      return;
    }
    for (let item of citiesData) {
      let location = {
        name: "",
        longitude: 0,
        latitude: 0,
      };
      location.name = item.name;
      countriesData.forEach(function (country, index) {
        if (country.code == item.country) {
          location.name += ", " + country.name;
        }
      });
      if (location.name.toLowerCase().includes(value.toLowerCase())) {
        location.longitude = item.lng;
        location.latitude = item.lat;
        res.push(location);
      }
      if (res.length > 4) {
        break;
      }
      setCities(res);
    }
  };

  const handleSelect = (value) => {
    const result = cities.filter((city) => city.name == value);
    setUserCity(value);
    let newCoords = {
      longitude: parseFloat(result[0].longitude),
      latitude: parseFloat(result[0].latitude),
      location_name: value,
      real_location: coords.real_location,
    };
    setCoords(newCoords);
  };

  const update = () => {
    message.success(`Your Info has updated !!`);

    // message.warning(
    //   `Your email has updated, please go to your ${email} address to confirm it !!`
    // );

    setUserLocation({
      longitude: coords.longitude,
      latitude: coords.latitude,
      location_name: coords.location_name,
      real_location: coords.real_location ? 1 : 0,
    });
    setUser(newUser);
  };

  return (
    <>
      <div
        style={{ width: props && props.mobile ? "100%" : "400px" }}
        className="profileInfoConatainer"
      >
        <div className={props.mobile ? "floatBtn" : "floatBtnDes"}>
          <Button
            shape="round"
            className={props.mobile ? "saveProfileBtn" : "saveProfileBtnDes"}
            onClick={saveButtonClick}
          >
            Save
          </Button>
        </div>
        {props && !props.mobile && <LikeViewItems />}
        <div className="accountSet">
          <h2 className="setTitle">ACCOUNT SETTINGS</h2>
          <div className="setBox rowsetBox">
            <h3 className="boxParam">Email</h3>
            <Input
              placeholder={newUser.email}
              style={{
                height: "80%",
                borderRadius: "10px",
                width: "200px",
                border: "0px",
                textAlign: "right",
                marginBottom: "9px",
              }}
              disabled={false}
              value={newUser.email}
              onChange={handelEmailChange}
            />
          </div>
          <div className="setBox borderTopNone rowsetBox">
            <h3 className="boxParam">Password</h3>
            <Input.Password
              placeholder="     input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{
                height: "80%",
                borderRadius: "10px",
                width: "200px",
                border: "0px",
                textAlign: "right",
                marginBottom: "9px",
              }}
              value={newUser.password}
              onChange={handelPassChange}
            />
          </div>
          <div className="setBox borderTopNone rowsetBox">
            <h3 className="boxParam">Re-enter Password</h3>
            <Input.Password
              placeholder="     input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{
                height: "80%",
                borderRadius: "10px",
                width: "200px",
                border: "0px",
                textAlign: "right",
                marginBottom: "9px",
              }}
              value={password}
              onChange={handelRePassChange}
            />
          </div>
          <div className="setBox borderTopNone rowsetBox">
            <h3 className="boxParam">First Name</h3>
            <Input
              placeholder={newUser.firstName}
              style={{
                height: "80%",
                borderRadius: "10px",
                width: "200px",
                border: "0px",
                textAlign: "right",
                marginBottom: "9px",
              }}
              value={newUser.firstName}
              onChange={handelFirstChange}
            />
          </div>
          <div className="setBox borderTopNone rowsetBox">
            <h3 className="boxParam">Last Name</h3>
            <Input
              placeholder={newUser.lastName}
              style={{
                height: "80%",
                borderRadius: "10px",
                width: "200px",
                border: "0px",
                textAlign: "right",
                marginBottom: "9px",
              }}
              value={newUser.lastName}
              onChange={handelLastChange}
            />
          </div>
        </div>
        <div className="accountSet">
          <h2 className="setTitle">DISCOVERY SETTINGS</h2>
          <div className="setBox rowsetBox">
            <h3 className="boxParam">Real location</h3>
            <Switch
              checked={coords.real_location}
              onChange={handelRealLocationChange}
            />
          </div>
          <div className="setBox rowsetBox">
            <h3 className="boxParam">Location</h3>
            <br />
            <br />
            <AutoComplete
              style={{
                width: 200,
              }}
              onSearch={handleSearch}
              placeholder={coords.location_name}
              disabled={coords.real_location}
              onSelect={handleSelect}
              value={coords.real_location ? coords.location_name : userCity}
            >
              {cities.map((city, index) => (
                <Option key={index} value={city.name}>
                  {city.name}
                </Option>
              ))}
            </AutoComplete>
          </div>
          <div className="setBox columnsetBox borderTopNone">
            <div className="rowsetBox">
              <h3 className="boxParam">Maximun Distance</h3>
              <h3 className="boxValue">{newUser.maxDistance} km.</h3>
            </div>
            {newUser.maxDistance && (
              <Slider
                max={200}
                defaultValue={newUser.maxDistance}
                onChange={handelDistanceChange}
                style={{ marginBottom: "15px" }}
              />
            )}
          </div>
          <div className="setBox borderTopNone rowsetBox">
            <h3 className="boxParam">Loking for</h3>
            {user.interessted && (
              <Select
                defaultValue={newUser.interessted}
                style={{ width: 150, marginBottom: "9px" }}
                onChange={interestingChange}
              >
                <Option value="men">Men</Option>
                <Option value="women">Women</Option>
                <Option value="both">Men & Women</Option>
              </Select>
            )}
          </div>
          <div className="setBox borderTopNone columnsetBox">
            <div className="rowsetBox">
              <h3 className="boxParam">Age Range</h3>
              <h3 className="boxValue">
                {newUser.minAge}-{newUser.maxAge}
              </h3>
            </div>
            {newUser.minAge && newUser.maxAge && (
              <Slider
                range
                step={1}
                min={18}
                max={39}
                defaultValue={[newUser.minAge, newUser.maxAge]}
                style={{ marginBottom: "15px" }}
                onChange={AgeRangeChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
