import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'
import axios from 'axios';
import { Spin, message } from 'antd';
import { getData } from "../tools/globalFunctions";

import { SER } from '../conf/config';

import { UserContext } from '../contexts/UserContext';

export default function Mainapp({width}) {

	const id = localStorage.getItem("userId");
	const [user, setUser] = useState({});
	const [update, setUpdate] = useState(false);
	const [loading, setLoading] = useState(true);
	const [warning, setWarning ] =  useState(true);
	const [error, setError] = useState({});
	const history = useHistory();

	useEffect(() => {
        const source = axios.CancelToken.source();
        const postData = async() => {
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
	}, [user]);



	useEffect(async () => {
		const token = localStorage.getItem('accessToken');
		if (!token || !id)
		{
			console.log("Redirect");
			history.push("/");
			localStorage.clear();
			return;
		}
		const userResult = await getData(`api/users/${id}`, {}, false);
		setLoading(false);
		setUser(userResult.data);
		setUpdate(true);
	}, [])
	

	return (
		<UserContext.Provider value={{user: user, setUser: setUser}}>
			<div className="containerMainapp">
				{loading ?
					<div className="loading">
						<Spin size="large" />
					</div>
						:<>
							{!user.verified && warning &&
								message.warning(`Your email is not verified, Please check your email to verify it !!`) 
								&& setWarning(false)}
							{width > 760 ? <DesktopSection width={width}/> : <MobileSection/>}
						</>
					}
			</div>
		</UserContext.Provider>
	)
}

