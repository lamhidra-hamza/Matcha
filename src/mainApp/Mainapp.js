import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Mainapp.scss";
import MobileSection from "../components/mobileSection/MobileSection";
import DesktopSection from "../components/desktopSection/DesktopSection";
import axios from "axios";
import { Spin, message } from "antd";
import { getData } from "../tools/globalFunctions";

import { SER } from "../conf/config";

import { UserContext } from "../contexts/UserContext";

export default function Mainapp({ width }) {
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [location, setlocation] = useState({});
  const [userImages, setUserImages] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState(true);
  const [error, setError] = useState({});
  const history = useHistory();
  let ip = null;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const postData = async () => {
      try {
        const result = await axios.put(`${SER.HOST}/api/users/${id}`, user);
        console.log("Result== ", result);
      } catch (err) {
        console.log("ERRROOR", err);
      }
    };
    if (update) postData();

    return () => {
      source.cancel();
    };
  }, [user]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const postData = async () => {
      try {
        const result = await axios.put(`${SER.HOST}/api/users/${id}`, user);
        console.log("Result== ", result);
      } catch (err) {
        console.log("ERRROOR", err);
      }
    };
    if (update) postData();

    return () => {
      source.cancel();
    };
  }, [user]);

  useEffect(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !id) {
      console.log("Redirect");
      history.push("/");
      localStorage.clear();
      return;
    }

	ip = await axios.get("https://api.ipify.org/?format=json");

	console.log(ip.data.ip);
	console.log("ipp");
	//let geoIpResult = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=978b0a54a29146d0a338c509fee94dab&ip=${ip.data.ip}`);

  //console.log(geoIpResult.data);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(
          `the position is ${position.coords.longitude} and ${position.coords.latitude}`
        );
      });
    }

    async function fetchData() {
      setLoading(true);
      const userResult = await getData(`api/users/${id}`, {}, false);
      const pictureResult = await getData(`api/pictures/${id}`, {}, false);
      console.log("picture== {", pictureResult.data);
      setUser(userResult.data);
      setUserImages(pictureResult.data.user);
      setLoading(false);
      setUpdate(true);
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        userImages: userImages,
        setUserImages,
      }}
    >
      <div className="containerMainapp">
        {loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {!user.verified &&
              warning &&
              message.warning(
                `Your email is not verified, Please check your email to verify it !!`
              ) &&
              setWarning(false)}
            {width > 760 ? <DesktopSection width={width} /> : <MobileSection />}
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}
