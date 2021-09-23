import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './DisplayUsers.scss';
import UserCard from '../userCard/UserCard.js';
import { Tooltip, Radio, message } from 'antd';
import FilterPopUp from '../filterPopUp/FilterPopUp';
import { ControlOutlined } from '@ant-design/icons';
import { getData } from "../../tools/globalFunctions";
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';

const DisplayUsers = ({ user }) => {
	const [filterVisible, SetFilterVisible] = useState([false, false]);
	const [filterParams, setFilerParams] = useState({
		tags: [],
		maxDistance: user.maxDistance,
		minAge: user.minAge,
		maxAge: user.maxAge,
		interessted: user.interessted,
		gender: user.gender,
		frameRate: 0,
		sortedBy: '',
		page : 0,
		numberOfItem: 4,
		browsingType: "Suggest",
	})
	const { state } = useLocation();
	const [sortedBy, setSortedBy] = useState([false, false, false, false]);
	const [loading, setloading] = useState(true);
	const [loadMore, setLoadMore] = useState(true);
	const [usersBrowsing, setUsersBrowsing] = useState([]);
	const [page, setPage] = useState(1);

	const getUsers = async () => {
		try {
			setPage(page + 1);
			const result = await getData(`api/users/`, {...filterParams, page: page }, false);
			if (result.data.users.length === 0)
				setLoadMore(false);
			setUsersBrowsing([...usersBrowsing, ...result.data.users]);
		} catch(err) {
			message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
		}
	}
	useEffect(() => {
		const element = document.getElementById('scrollingDisplayUser').getBoundingClientRect();
		const surface = (element.height - 100) * (element.width - 100);
		const numOfItemsPossible =  Math.floor(surface / (310 * 360)) + 1;

		if (numOfItemsPossible !== filterParams.numberOfItem)
			setFilerParams({...filterParams, numberOfItem: numOfItemsPossible});
		if (state && state.liked_user)
			setUsersBrowsing([...usersBrowsing.filter(user => user.id !== state.liked_user)]);
		if (state && state.blocked_user)
			setUsersBrowsing([...usersBrowsing.filter(user => user.id !== state.blocked_user)]);
		
		    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterParams]);

	useEffect(() => {
		const source = axios.CancelToken.source();
		
		setLoadMore(true);
		setPage(1);
		async function fetchUsers() {
			try {
				setloading(true)
				const result = await getData(`api/users/`, filterParams, false);
				if (result)
				{
					(result.data.users.length === 0) && setLoadMore(false);
					setUsersBrowsing(result.data.users);
				}
				setloading(false);
			} catch (err) {
				message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
			}
		}
		fetchUsers();

		return () => {
			source.cancel();
		};

	}, [filterParams])

	function showRegister() {
		SetFilterVisible([filterVisible[0], !filterVisible[1]])
	}

	function handleCancel() {
		SetFilterVisible([false, false])
	}

	const handleSizeChange = e => {
		setFilerParams((prev)=>  { return {...prev, browsingType: e.target.value }});
	};
	
	if (loading)
		return (
			<div className="mainDusersContainer">
				<div id="scrollingDisplayUser" className="dusersContent">
					<div className="loading">
						<Spin size="large" />
					</div>
				</div>
			</div>
		)
	return (
		<div className="mainDusersContainer">
			<div className="filter">
				<div>
					<Radio.Group value={filterParams.browsingType} onChange={handleSizeChange}>
						<Radio.Button value="Suggest">Suggest</Radio.Button>
						<Radio.Button value="Search">Search</Radio.Button>
					</Radio.Group>
				</div>
				<div>
					<Tooltip title="Filter">
					<ControlOutlined
						onClick={showRegister}
						style={{fontSize: '40px', color: "#ff75a7"}}/>
					</Tooltip>
				</div>
			</div>
			<div id="scrollingDisplayUser" className="dusersContent">
				<InfiniteScroll
					dataLength={usersBrowsing.length}
					next={getUsers}
					hasMore={loadMore}
					style={{ display: 'flex', flexWrap: 'wrap',
					justifyContent: 'center' }}
					loader={
						<div className="Scrollloading">
							<Spin />
						</div>
						}
					scrollableTarget="scrollingDisplayUser"
					endMessage={
						<p className="endMessage">
						</p>
					}>
					{usersBrowsing.map((item) => {
						return (<UserCard key={item.id} user={item}/>)
					})}
				</InfiniteScroll>
			</div>
			
			<FilterPopUp
				visible={filterVisible[1]}
				handleCancel={handleCancel}
				mobile={true}
				filterParams={filterParams}
				setFilerParams={setFilerParams}
				sortedBy={sortedBy}
				setSortedBy={setSortedBy}
			/>
		</div>
	)
	}

export default DisplayUsers
