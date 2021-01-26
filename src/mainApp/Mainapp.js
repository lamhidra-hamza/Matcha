import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'
import axios from 'axios';
import { Spin, message, notification } from 'antd';
import {
	logOut,
	getCoords,
	getData,
	putData,
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
	const userInput = "Hi, <img src='' onerror='alert(0)' />";
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
	const [loading, setLoading] = useState(true);
	const [realCoordinates, setRealCoordinates] = useState({...userLocation});
	const [tags, setTags] = useState([""]);
	const [warning, setWarning] = useState(true);
	const [error, setError] = useState({});
	const history = useHistory();
	const [Notification, setNotification] = useState([])

	useEffect(async () => {
		socket.emit("joinNotification", {}, (error) => {
			if (error) {
			  alert(error);
			}
		  });
		socket.on("notification", async ({ notifiedUser, notifyId }) => {
			if (notifiedUser === id)
			{
				const result = await getData(`api/notifications/${notifyId}`, {}, false);
				const notify = result.data.data;
				if (notify)
				{
					let message = "You have new notification !!";
					if (notify.type === "like")
						message = "Yow Someone Like You lets Go !!";
					if (notify.type === "matche" )
						message = "Yow Congratulation you got New MATCHE !!";
					if (notify.type === "view" )
						message = "Someone viewed your profile !!";
					if (notify.type === "message")
						message = "you got a new message !!";
					notification['info']({ message: message });
					console.log('Notify ====> ', notify);
					setNotification((Notification) => {
						console.log("Prev ==== ", Notification)
						return [...Notification, notify];
					});
				}
			}
		});

		return () => socket.disconnect();

	}, [])

	useEffect(() => {
		const source = axios.CancelToken.source();
		const postData = async () => {
			console.log("update user informatin in the database");
			await putData(`api/users/${id}`, user);
		};
		if (update) postData();
	
		return () => {
			source.cancel();
		};

	}, [user]);

	useEffect(() => {
		console.log("the location has been changed");
		const source = axios.CancelToken.source();
		const postData = async () => {
		console.log("update user location in the database");
		let result = await putData(`api/location/${id}`, userLocation);
		};
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
			return ;
		}
		const source = axios.CancelToken.source();

		async function fetchData() {
			setLoading(true);

			const userResult = await getData(`api/users/${id}`, {}, false);
			console.log("USSSSERR==>", userResult)
			const pictureResult = await getData(`api/pictures/${id}`, {}, false);
			const tags = await getData(`api/tags/`, {}, false);
			const notiResult = await getData(`api/notifications/`, {}, false);
			let locationResult = await getData(`api/location/${id}`, {}, false);

			userLocation.latitude = locationResult.data.latitude;
			userLocation.longitude = locationResult.data.longitude;
			userLocation.location_name = locationResult.data.location_name;
			userLocation.real_location = locationResult.data.real_location;
			
			console.log("call get coords");
			locationResult = await getCoords(userLocation);
			console.log(" main app the new Location are", locationResult);

			let newLocation = {...userLocation};
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
				user, setUser, userImages, setUserImages, userLocation,
				setUserLocation, realCoordinates, tags, setTags, socket,
				Notification, setNotification
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
