import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './DisplayLikedMe.scss';
import UserCard from '../userCard/UserCard.js';
import { getData } from "../../tools/globalFunctions";
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';

const DisplayLikedMe = () => {
	const [Params, setParams] = useState({
		page : 0,
		numberOfItem: 4
	})
	const { state } = useLocation();
	const [loading, setloading] = useState(true);
	const [loadMore, setLoadMore] = useState(true);
	const [usersBrowsing, setUsersBrowsing] = useState([]);
	const [page, setPage] = useState(1);

	const getUsers = async () => {
		setPage(page + 1);
		const result = await getData(`api/users/likedme`, {...Params, page: page }, false);
		console.log(result.data.users);
		if (result.data.users.length === 0)
			setLoadMore(false);
		setUsersBrowsing([...usersBrowsing, ...result.data.users]);
	}

	useEffect(() => {
		const element = document.getElementById('scrollingDiv').getBoundingClientRect();
		const surface = (element.height - 100) * (element.width - 100);
		const numOfItemsPossible =  Math.floor(surface / (310 * 360));
		if (numOfItemsPossible !== Params.numberOfItem)
			setParams({...Params, numberOfItem: numOfItemsPossible});
		if (state && state.liked_user)
			setUsersBrowsing([...usersBrowsing.filter(user => user.id !== state.liked_user)]);
		if (state && state.blocked_user)
			setUsersBrowsing([...usersBrowsing.filter(user => user.id !== state.blocked_user)]);
	}, []);

	useEffect(() => {
		const source = axios.CancelToken.source();
		
		setLoadMore(true);
		setPage(1);

		async function fetchUsers() {
			setloading(true)
			const result = await getData(`api/users/likedme`, Params, false);
			console.log(result.data.users);
			setUsersBrowsing(result.data.users);
			setloading(false);
		}
		fetchUsers();

		return () => {
			source.cancel();
		};

	}, [Params])


	if (loading)
		return (
			<div className="DusersContainer">
				<div id="scrollingDiv" className="dusersContent">
					<div className="loading">
						<Spin size="large" />
					</div>
				</div>
			</div>
		)
	return (
		<div className="DusersContainer">
			<div id="scrollingDiv" className="dusersContent">
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
					scrollableTarget="scrollingDiv"
					endMessage={
						<p className="endMessage">
						<b>Yay! You have seen it all</b>
						</p>
					}>
					{usersBrowsing.map((item) => {
						return (<UserCard key={item.id} user={item}/>)
					})}
				</InfiniteScroll>
			</div>
			
		</div>
	)
	}

export default DisplayLikedMe
