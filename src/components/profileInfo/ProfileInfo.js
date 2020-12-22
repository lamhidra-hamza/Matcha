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
  const { user, setUser, userLocation, setUserLocation } = useContext(
    UserContext
  );
  const [newUser, setNewUser] = useState({ ...user});
  const [coords, setCoords] = useState({ ...userLocation });
  const [cities, setCities] = useState([]);

  const history = useHistory();

  const interestingChange = (value) => {};

  const saveButtonClick = () => {
    history.goBack();
  };

  const handelEmailChange = ({ target: { value } }) => {
    setNewUser({...newUser, email: value});
  };

  const handelPassChange = ({ target: { value } }) => {
    setNewUser({...newUser, password: value});
  };

  const handelFirstChange = ({ target: { value } }) => {
    setNewUser({...newUser, firstName: value});
  };

  const handelLastChange = ({ target: { value } }) => {
    setNewUser({...newUser, lastName: value});
  };

  const AgeRangeChange = (range) => {
    setNewUser({ ...newUser, minAge: range[0], maxAge: range[1] });
  };

  const handelDistanceChange = (dis) => {
    setNewUser({ ...newUser, maxDistance: dis });
  };

  const handelRealLocationChange = () => {
    if (coords.real_location)
      setCoords({
        ...coords,
        real_location: !coords.real_location,
        location_name: userLocation.location_name,
      });
    else setCoords({ ...coords, real_location: !coords.real_location });
  };

  const handleSearch = (value) => {
    let res = [];
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
    let newCoords = {
      longitude: parseFloat(result[0].longitude),
      latitude: parseFloat(result[0].latitude),
      location_name: value,
      real_location: coords.real_location,
    };
    setCoords(newCoords);
  };

  const update = () => {
    // message.success(`Your first name has updated to ${firstName}`);

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
        <div className="floatBtn">
          <Button shape="round" className={"saveProfileBtn"} onClick={update}>
            Save
          </Button>
        </div>
        = <LikeViewItems />
        <div className="accountSet">
          <h2 className="setTitle">ACCOUNT SETTINGS</h2>
          <div className="setBox rowsetBox">
            <h3 className="boxParam">Email</h3>
            <Input
              placeholder={user.email}
              style={{
                height: "2vh",
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
                height: "2vh",
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
            <h3 className="boxParam">First Name</h3>
            <Input
              placeholder={user.firstName}
              style={{
                height: "2vh",
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
              placeholder={user.lastName}
              style={{
                height: "2vh",
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
              placeholder={userLocation.location_name}
              disabled={coords.real_location}
              onSelect={handleSelect}
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
              <h3 className="boxValue">{user.maxDistance} km.</h3>
            </div>
            {user.maxDistance && (
              <Slider
                max={200}
                defaultValue={user.maxDistance}
                onChange={handelDistanceChange}
                style={{ marginBottom: "15px" }}
              />
            )}
          </div>
          <div className="setBox borderTopNone rowsetBox">
            <h3 className="boxParam">Loking for</h3>
            {user.interessted && (
              <Select
                defaultValue={user.interessted}
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
                {user.minAge}-{user.maxAge}
              </h3>
            </div>
            {user.minAge && user.maxAge && (
              <Slider
                range
                step={1}
                min={18}
                max={39}
                defaultValue={[user.minAge, user.maxAge]}
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
