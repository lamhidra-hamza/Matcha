import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'
import axios from 'axios';
import { Spin } from 'antd';
import {getData} from "../tools/globalFunctions";

import { SER } from '../conf/config';

import { UserContext } from '../contexts/UserContext';

export default function Mainapp({width}) {

	const id = localStorage.getItem("userId");
	const [user, setUser] = useState({});
	const [update, setUpdate] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});
	const history = useHistory();

	useEffect(async () => {
		const token = localStorage.getItem('accessToken');
		if (!token || !id)
		{
			console.log("Redirect");
			history.push("/");
			localStorage.setItem('accessToken', "");
			localStorage.setItem('userId', "");
			return;
		}
		const userResult = await getData(async(token) => {
			const result = await axios.get(`http://localhost:5000/api/users/${id}`,  {
				params: {
				  token: token
				}
			  });
				return result.data;
		});
		console.log(userResult);
		setUser(userResult);
		console.log("returned data");
		console.log(userResult);
	}, [])

	

	return (
		<UserContext.Provider value={{user: user, setUser: setUser}}>
			<div className="containerMainapp">
				{loading ?
				<div className="loading">
					<Spin size="large" />
					</div>
					: width > 760 ? <DesktopSection width={width}/> : <MobileSection/>
					}
			</div>
		</UserContext.Provider>
	)
}

