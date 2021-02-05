import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./Mainapp.scss";
import MobileSection from "../components/mobileSection/MobileSection";
import DesktopSection from "../components/desktopSection/DesktopSection";
import axios from "axios";
import { Spin, message, notification } from "antd";
import {
  logOut,
  getCoords,
  getData,
  putData,
  notifyMe,
} from "../tools/globalFunctions";
import { UserContext } from "../contexts/UserContext";
import { io } from "socket.io-client";

var socket = io("http://localhost:8000", {
  withCredentials: true,
  extraHeaders: {
    token: "the real token is ",
  },
});

export default function Mainapp({ width }) {
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [userImages, setUserImages] = useState(null);
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
    location_name: "",
    real_location: true,
  });

  const [accountStats, setAccountStats] = useState({
    messages: [],
    newMessage: false,
    matches: 0,
    likes: 0,
    views: 0,
  });

  const [updateLocation, setUpdateLocation] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [realCoordinates, setRealCoordinates] = useState({ ...userLocation });
  const [tags, setTags] = useState([""]);
  const [warning, setWarning] = useState(true);
  const history = useHistory();
  const [Notification, setNotification] = useState([]);

  const newMessageUpdateStats = () => {
        setAccountStats({ ...accountStats, newMessage: true});
  }

  useEffect(() => {
    socket.emit("joinNotification", {}, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.on("notification", async ({ notifiedUser, notifyId }) => {
      if (notifiedUser === id) {
        const result = await getData(
          `api/notifications/${notifyId}`,
          {},
          false
        );
        const notify = result.data.data;
        if (notify) {
          let message = "You have new notification !!";
          if (notify.type === "like")
          {
            message = "Yow Someone Like You lets Go !!";
          }
          if (notify.type === "matche")
            message = "Yow Congratulation you got New MATCHE !!";
          if (notify.type === "view")
            message = "Someone viewed your profile !!";
          if (notify.type === "unmatch")
            message = "someone unliked you !!";
          if (notify.type === "block")
            message = "someone blocked you !!";
          if (notify.type === "message") {
            message = "you got a new message !!";
            newMessageUpdateStats();
          }
          notification["info"]({ message: message });
          setNotification((Notification) => {
            return [...Notification, notify];
          });
          notifyMe(message);
        }
      }
    });
    return () => socket.disconnect();
        //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const postData = async () => {
      await putData(`api/users/${id}`, user);
    };
    if (update) postData();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const postData = async () => {
      await putData(`api/location/${id}`, userLocation);
    };
    if (updateLocation) postData();
    return () => {
      source.cancel();
    };
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || !id || token === null || id === null) {
      logOut();
      history.push("/");
      localStorage.clear();
      return;
    }
    const source = axios.CancelToken.source();

    async function fetchData() {
      setLoading(true);

      const userStats = await getData(`api/chat/count`, {}, false);
      setAccountStats(userStats.data.data);
      const userResult = await getData(`api/users/${id}`, {}, false);
      const pictureResult = await getData(`api/pictures/${id}`, {}, false);
      const tags = await getData(`api/tags/`, {}, false);
      const notiResult = await getData(`api/notifications/`, {}, false);
      let locationResult = await getData(`api/location/${id}`, {}, false);
      userLocation.latitude = locationResult.data.latitude;
      userLocation.longitude = locationResult.data.longitude;
      userLocation.location_name = locationResult.data.location_name;
      userLocation.real_location = locationResult.data.real_location;
      locationResult = await getCoords(userLocation);
      let newLocation = { ...userLocation };
      newLocation.location_name = locationResult.location_name;
      newLocation.latitude = locationResult.latitude;
      newLocation.longitude = locationResult.longitude;
      setUpdateLocation(true);
      setRealCoordinates(newLocation);
      if (userLocation.real_location) {
        setUserLocation(newLocation);
      }
      setUser(userResult.data);
      setUserImages(pictureResult.data);
      setTags(tags.data.data);
      setNotification(notiResult.data.data);
      setUpdateLocation(true);
      setLoading(false);
      setUpdate(true);
    }
    fetchData();
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="containerMainapp">
        <div className="loading">
          <Spin size="large" />
        </div>
      </div>
    );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userImages,
        setUserImages,
        userLocation,
        setUserLocation,
        realCoordinates,
        tags,
        setTags,
        socket,
        Notification,
        setNotification,
        accountStats,
        setAccountStats
      }}
    >
      <div className="containerMainapp">
        {!user.verified &&
          warning &&
          message.warning(
            `Your email is not verified, Please check your email to verify it !!`
          ) &&
          setWarning(false)}
        {width > 760 ? <DesktopSection width={width} /> : <MobileSection />}
      </div>
    </UserContext.Provider>
  );
}
