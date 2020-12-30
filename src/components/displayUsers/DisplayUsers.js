import { React, useState, useEffect} from 'react';
import './DisplayUsers.scss';
import UserCard from '../userCard/UserCard.js';
import { Tooltip } from 'antd';
import FilterPopUp from '../filterPopUp/FilterPopUp';
import { ControlOutlined } from '@ant-design/icons';
import { getData } from "../../tools/globalFunctions";
import { Spin } from 'antd';

const DisplayUsers = ({user}) => {
	const [filterVisible, SetFilterVisible] = useState([false, false]);
	const [filterParams, setFilerParams] = useState({
		tags: ["traveling", "swiming"],
		Distance: user.Distance,
		minAge: user.minAge,
		maxAge: user.maxAge,
		sortBy: ""
	})
	const [loading, setloading] = useState(true);
	const [usersBrowsing, setUsersBrowsing] = useState([]);

	useEffect(() => {
		async function fetchUsers() {
			setloading(true)
			const result = await getData(`api/users/`, filterParams, false);
			console.log(result.data.users);
			setUsersBrowsing(result.data.users);
			setloading(false);
		}
		fetchUsers();
		
	}, [])

	function showLogin() {
		SetFilterVisible([!filterVisible[0], filterVisible[1]])
	}

	function showRegister() {
		SetFilterVisible([filterVisible[0], !filterVisible[1]])
	}

	function handleCancel() {
		SetFilterVisible([false, false])
	}
	if (loading)
		return (
			<div className="DusersContainer">
				<div className="loading">
					<Spin size="large" />
				</div>
			</div>
		)
	return (
		<div className="DusersContainer">
			<div className="filter">
				<div className="filterButton" >
					<Tooltip title="Filter">
					<ControlOutlined onClick={showRegister} style={{fontSize: '40px', color: "#ff75a7"}}/>
					</Tooltip>
				</div>
			</div>
			<div className="dusersContent">
				{usersBrowsing.map((item) => {
					return (<UserCard key={item.id} user={item}/>)
				})}
			</div>
			<FilterPopUp
				visible={filterVisible[1]}
				handleCancel={handleCancel}
				mobile={true}
			/>
		</div>
	)
	}

export default DisplayUsers
