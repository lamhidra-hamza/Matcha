import React, { useState, useEffect } from 'react';
import './MatcheDisplay.scss';
import MatchaCard from '../matchCard/MatchCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin, message } from 'antd';
import axios from 'axios';
import { getData } from "../../tools/globalFunctions";

export default function MatcheDisplay(props) {
    const [Matches, setMatches] = useState([]);
    const [loadMore, setLoadMore] = useState(true);
    const [loading, setloading] = useState(true);
    const [page, setPage] = useState(1);
	const Params = {
		page: 0,
		numberOfItem: 30
	}

    const getUsers = async () => {
		try {
			setPage(page + 1);
			const result = await getData(`api/matches/`, {...Params, page: page }, false);
			if (result.data.data.length === 0)
				setLoadMore(false);
			setMatches([...Matches, ...result.data.data]);
		} catch (err) {
			message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
		}
	}

    useEffect(() => {
        const source = axios.CancelToken.source();

        setLoadMore(true);
		setPage(1);
        async function fetchUsers() {
			try {
				setloading(true)
				const result = await getData(`api/matches/`, Params, false);
				(result.data.data.length === 0) && setLoadMore(false);
				setMatches(result.data.data);
				setloading(false);
			} catch (err) {
				message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
			}
		}
		fetchUsers();

		return () => {
			source.cancel();
		};
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
					justifyContent: 'center'  }}
					loader={
						<div className="Scrollloading">
							<Spin />
						</div>
						}
					scrollableTarget="scrollingDiv"
					endMessage={
						<p className="endMessage">
						</p>
					}>
					{Matches.map((item) => {
						return (<MatchaCard key={item.id} user={item} mobile={props.mobile}/>)
					})}
				</InfiniteScroll>
        </div>
    )
}
