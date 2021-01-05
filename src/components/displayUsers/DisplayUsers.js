import { React, useState, useEffect} from 'react';
import './DisplayUsers.scss';
import UserCard from '../userCard/UserCard.js';
import { Tooltip } from 'antd';
import FilterPopUp from '../filterPopUp/FilterPopUp';
import { ControlOutlined } from '@ant-design/icons';
import { getData } from "../../tools/globalFunctions";
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const DisplayUsers = ({user}) => {
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
		numberOfItem: 4
	})
	const [sortedBy, setSortedBy] = useState([false, false, false, false]);
	const [loading, setloading] = useState(true);
	const [loadMore, setLoadMore] = useState(true);
	const [usersBrowsing, setUsersBrowsing] = useState([]);
	const [page, setPage] = useState(1);

	const getUsers = async () => {
		setPage(page + 1);
		const result = await getData(`api/users/`, {...filterParams, page: page }, false);
		console.log(result.data.users);
		if (result.data.users.length === 0)
			setLoadMore(false);
		setUsersBrowsing([...usersBrowsing, ...result.data.users]);
	}

	useEffect(() => {
		async function fetchUsers() {
			setloading(true)
			const result = await getData(`api/users/`, filterParams, false);
			console.log(result.data.users);
			setUsersBrowsing(result.data.users);
			setloading(false);
		}
		fetchUsers();

	}, [filterParams])

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
					<ControlOutlined
						onClick={showRegister}
						style={{fontSize: '40px', color: "#ff75a7"}}/>
					</Tooltip>
				</div>
			</div>
			<div id="scrollingDiv" className="dusersContent">
				<InfiniteScroll
					dataLength={usersBrowsing.length}
					next={()=> setTimeout(getUsers, 1000) }
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
						<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
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
