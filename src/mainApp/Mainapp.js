import React, { useContext, useState, useEffect } from "react";
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
import { ErrorStatusContext } from "../contexts/ErrorContext";

var socket = io("http://localhost:8000", {
  withCredentials: true,
});

export default function Mainapp(props) {
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
  const { setHttpCodeStatus } = useContext(ErrorStatusContext);

  const newMessageUpdateStats = () => {
    setAccountStats({ ...accountStats, newMessage: true });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    let isCancelled = false;
    // socket.emit("joinNotification", {}, (error) => {
    //   if (error) {
    //     alert(error);
    //   }
    // });
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
            message = "Yow Someone Like You lets Go !!";
          if (notify.type === "matche")
            message = "Yow Congratulation you got New MATCHE !!";
          if (notify.type === "view")
            message = "Someone viewed your profile !!";
          if (notify.type === "unmatch") message = "someone unliked you !!";
          if (notify.type === "block") message = "someone blocked you !!";
          if (notify.type === "message") {
            message = "you got a new message !!";
            newMessageUpdateStats();
          }
          notification["info"]({ message: message });
          if (!isCancelled)
            setNotification((Notification) => {
              return [...Notification, notify];
            });
          notifyMe(message);
        }
      }
    });

    return () => {
      socket.disconnect();
      source.cancel();
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    let noPicture = false;
    if (!warning) {
      for (const [key, value] of Object.entries(userImages)) {
        if (key.includes("picture") && value !== null) noPicture = true;
      }
      if (!noPicture) history.push("/app/profile/edit");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warning]);

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
      try {
        setLoading(true);
        const userStats = await getData(`api/chat/count`, {}, false);
        setAccountStats(userStats.data.data);
        const userResult = await getData(`api/users/${id}`, {}, false);
        const pictureResult = await getData(`api/pictures/${id}`, {}, false);
        console.log("the pictures is", pictureResult);
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
        setUpdate(true);

        if (!user.verified && warning)
          message.warning(
            `Your email is not verified, Please check your email to verify it !!`
          );
        setWarning(false);
        setLoading(false);
      } catch (err) {
        setHttpCodeStatus(err.response.status);
      }
    }
    fetchData();
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const test1 = (
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
        setAccountStats,
      }}
    >
      <div className="containerMainapp">
        {props.width > 760 ? (
          <DesktopSection width={props.width} />
        ) : (
          <MobileSection />
        )}
      </div>
    </UserContext.Provider>
  );

  const test2 = (
    <div className="containerMainapp">
      <div className="loading">
        <Spin size="large" />
      </div>
    </div>
  );

  return <div>{!loading ? test1 : test2}</div>;
}
