import React, { useState, useEffect } from 'react';
import './MatcheDisplay.scss';
import MatchaCard from '../matchCard/MatchCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';
import axios from 'axios';
import { getData } from "../../tools/globalFunctions";

export default function MatcheDisplay(props) {
    const [Matches, setMatches] = useState([]);
    const [loadMore, setLoadMore] = useState(true);
    const [loading, setloading] = useState(true);
    const [page, setPage] = useState(1);
    const [Params, setParams] = useState({
		page : 0,
		numberOfItem: 30
	})

    const getUsers = async () => {
		setPage(page + 1);
		const result = await getData(`api/matches/`, {...Params, page: page }, false);
		console.log(result.data.users);
		if (result.data.users.length === 0)
			setLoadMore(false);
		setMatches([...Matches, ...result.data.users]);
	}

    useEffect(() => {
        const source = axios.CancelToken.source();

        setLoadMore(true);
		setPage(1);
        async function fetchUsers() {
			setloading(true)
			const result = await getData(`api/matches/`, Params, false);
			console.log("helllppp", result.data.data);
			setMatches(result.data.data);
			setloading(false);
		}
		fetchUsers();

		return () => {
			source.cancel();
		};

    }, [])

    if (loading)
        return (
            <div className="Matches-Container">
                <div className="loading">
                    <Spin size="large" />
                </div>
            </div>
        )

    return (
        <div className="Matches-Container"  id="scrollingDiv">
            <InfiniteScroll
					dataLength={Matches.length}
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
					{Matches.map((item) => {
						return (<MatchaCard key={item.id} user={item} mobile={props.mobile}/>)
					})}
				</InfiniteScroll>
        </div>
    )
}
