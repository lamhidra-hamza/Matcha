import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'
import axios from 'axios';
import { Spin, message } from 'antd';
import {
	getData,
	putData,
	getLocation,
	logOut,
  } from "../tools/globalFunctions";

import { UserContext } from '../contexts/UserContext';

export default function Mainapp({width}) {

	const id = localStorage.getItem("userId");
	const [user, setUser] = useState({});
	const [userImages, setUserImages] = useState(null);
	const [tags, setTags] = useState([""]);
	const [userLocation, setUserLocation] = useState({
		longitude: 0,
		latitude: 0,
		location_name: "",
		real_location: true,
	  });
	  const [updateLocation, setUpdateLocation] = useState(false);

	const [update, setUpdate] = useState(false);
	const [loading, setLoading] = useState(true);
	const [warning, setWarning ] =  useState(true);
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
		const token = localStorage.getItem('accessToken');
		if (!token || !id || token === null || id === null)
		{
			console.log("Redirect");
			logOut();
			history.push("/");
			localStorage.clear();
			return;
		}
		async function fetchData() {
			setLoading(true);
			const userResult = await getData(`api/users/${id}`, {}, false);
			const pictureResult = await getData(`api/pictures/${id}`, {}, false);
			const tags = await getData(`api/tags/`, {}, false);
			const locationResult = await getData(`api/location/${id}`, {}, false);
			userLocation.latitude = locationResult.data.latitude;
			userLocation.longitude = locationResult.data.longitude;
			userLocation.location_name = locationResult.data.location_name;
			userLocation.real_location = locationResult.data.real_location;
			console.log("the userlocation real location", userLocation.real_location);
			if (userLocation.real_location) {
				if (navigator.geolocation) {
					navigator.geolocation.watchPosition(function (position) {
					let locationResult = getLocation(position.coords.longitude, position.coords.latitude);
					let newLocation = { ...userLocation };
					newLocation.location_name = locationResult.name;
					newLocation.latitude = locationResult.latitude;
					newLocation.longitude = locationResult.longitude;
					setUpdateLocation(true);
					setUserLocation(newLocation);
					console.log("the new locatino is ", newLocation);
				});
				} else {
				setUpdateLocation(true);
				// let ip = await axios.get("https://api.ipify.org/?format=json");
				// let geoIpResult = await axios.get(
				//   `https://api.ipgeolocation.io/ipgeo?apiKey=978b0a54a29146d0a338c509fee94dab&ip=${ip.data.ip}`
				// );
				}
			}
			setUser(userResult.data);
			setUserImages(pictureResult.data);
			setTags(tags.data.data);
			setLoading(false);
			setUpdate(true);
		}
		fetchData();

	}, [])



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
