import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'
import axios from 'axios';
import { Spin, message } from 'antd';
import {
  logOut,
  getCoords,
  getData,
	putData,
} from "../tools/globalFunctions";
import { SER } from "../conf/config";
import { UserContext } from "../contexts/UserContext";
import { parse } from "@fortawesome/fontawesome-svg-core";

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
  const [updateLocation, setUpdateLocation] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatePic, setUpdatePic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [realCoordinates, setRealCoordinates] = useState({...userLocation});
  const [tags, setTags] = useState([""]);
  const [warning, setWarning] = useState(true);
  const [error, setError] = useState({});
  const history = useHistory();

  useEffect(() => {
		const source = axios.CancelToken.source();
		const postData = async () => {
		  console.log("update user informatin in the database");
		  let result = await putData(`api/users/${id}`, user);
		  console.log("the result of the put user is ", result.data);
		};
		if (update) postData();
	
		return () => {
		  source.cancel();
		};
	  }, [user]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const putData = async () => {
      try {
        const result = await axios.put(
          `${SER.HOST}/api/pictures/${userImages.id}`,
          userImages
        );
        //console.log("Result== ", result);
      } catch (err) {
        //console.log("ERRROOR", err);
      }
    };
    if (updatePic) putData();

    return () => {
      source.cancel();
    };
  }, [userImages]);

  useEffect(() => {
    console.log("the location has been changed");
    const source = axios.CancelToken.source();
    const postData = async () => {
      console.log("update user location in the database");
      let result = await putData(`api/location/${id}`, userLocation);
      console.log("the result of the put location is ", result.data);
    };
    console.log("the updatelocation is ", updateLocation);
    if (updateLocation) postData();

    return () => {
      source.cancel();
    };
  }, [userLocation]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || !id || token === null || id === null) {
      console.log("Redirect");
      logOut();
      history.push("/");
      localStorage.clear();
      return;
    }

    async function fetchData() {
      setLoading(false);

      const userResult = await getData(`api/users/${id}`, {}, false);
      const pictureResult = await getData(`api/pictures/${id}`, {}, false);
      let locationResult = await getData(`api/location/${id}`, {}, false);
      userLocation.latitude = locationResult.data.latitude;
      userLocation.longitude = locationResult.data.longitude;
      userLocation.location_name = locationResult.data.location_name;
      userLocation.real_location = locationResult.data.real_location;
      locationResult = await getCoords(userLocation);
      let newLocation = {...userLocation};
        newLocation.location_name = locationResult.location_name;
        newLocation.latitude = locationResult.latitude;
        newLocation.longitude = locationResult.longitude;
        setUpdateLocation(true);
        setRealCoordinates(newLocation);
        if (userLocation.real_location){
          setUserLocation(newLocation);
        }
      setUser(userResult.data);
      setUserImages(pictureResult.data);
      setLoading(false);
      setUpdate(true);
      setUpdatePic(true);
      setTags(tags.data.data);
      setUpdateLocation(true);
    }
    fetchData();
  }, []);

  if (loading)
return (
	<div className="containerMainapp">
		<div className="loading">
			<Spin size="large" />
		</div>
	</div>
)

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        userImages: userImages,
        setUserImages: setUserImages,
        userLocation: userLocation,
        setUserLocation: setUserLocation,
        realCoordinates: realCoordinates,
		    tags: tags,
		setTags: setTags
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
