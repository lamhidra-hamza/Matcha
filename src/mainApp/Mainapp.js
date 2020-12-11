import React, { useState, useEffect } from 'react'
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'
import axios from 'axios';
import { Spin } from 'antd';

import { SER } from '../conf/config';

import { UserContext } from '../contexts/UserContext';

export default function Mainapp({width}) {

	const id = "7807d027-cc0b-40e2-8bea-bfa9c4df7f6d";
	const [user, setUser] = useState({});
	const [update, setUpdate] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});

	useEffect(() => {
		const source = axios.CancelToken.source();
		const postData = async () => {
			try {
				const result = await axios.put(`${SER.HOST}/api/users/${id}`, user)
				console.log("Result== ", result);
			} catch (err) {
				console.log("ERRROOR", err);
			}
		}
		if (update)
			postData();

		return () => {
			source.cancel();
		}
	}, [user])

	useEffect(() => {
		const source = axios.CancelToken.source();
		const getData = async () => {
			setLoading(true);
			try {
				setError({})
				const result = await axios.get(`${SER.HOST}/api/users/${id}`)
				console.log(result.data.user);
				setUser(result.data.user);
		
			} catch (err) {
				setError(err);
			}
			setLoading(false);
		}

		getData();

		setUpdate(true)
		return () => {
			source.cancel();
		}
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

