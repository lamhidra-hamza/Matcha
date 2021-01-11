import React, {useState, useEffect} from 'react'
import { Carousel, Tag, Divider, Skeleton} from 'antd'
import axios from 'axios'
import {
  EnvironmentTwoTone,
  HeartTwoTone,
  MinusCircleTwoTone,
} from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import './InfoCardUsers.css'
import { SER } from '../../conf/config'
import { getData, postData } from '../../tools/globalFunctions'


const Infocard = () => {
		
	const { id }  = useParams();
	const history = useHistory();
	const [UserInfo, setUserInfo] = useState({});
	const [Tags, setTags] = useState([]);
	const [IsLikedMe, setIsLikedMe] = useState(false);
	const [loading, setloading] = useState(true);

	useEffect(() => {
		const source = axios.CancelToken.source();

		const fetchData = async () => {
			setloading(true);
			const result = await getData(`api/users/infocard/${id}`, {}, false);
			const tags = await getData(`api/tags/${id}`, {}, false);
			const likedMe = await getData(`api/likes/${id}`, {}, false);
			if (likedMe.data.user)
				setIsLikedMe(true);
			setUserInfo({...result.data, images: [
				result.data.picture_1,
				result.data.picture_2,
				result.data.picture_3,
				result.data.picture_4,
				result.data.picture_5,
			]});
			setTags(tags.data.data);
			setloading(false);
		}

		fetchData();

		return () => {
			source.cancel();
		};

	}, [])

	const handleBlockClick = () => {
		postData(`api/block`, {blocked_user: id})
		history.push({
			pathname: '/app',
			state: {
				mobileKey: "1",
				desKey: "1", 
				mobile: false,
				blocked_user: id
			},
		})
	}

	const handleLikeClick = () => {
		postData(`api/likes`, { liked_user: id });
		IsLikedMe && postData(`api/matches`, { matched_user: id});
		history.push({
			pathname: '/app',
			state: {
				mobileKey: "1",
				desKey: "1", 
				mobile: false,
				liked_user: id
			},
		})
	}

	if (loading)
		return (
			<div className="rightSideCard">
				<div className="infoCardContainer">
				<div className="infoPage">
					<div style={{width: '95%', paddingTop: '5%', paddingLeft: '5%'}}>
						<Skeleton paragraph={{ rows: 10 }}  active />
					</div>
				</div>
				</div>
			</div>)

	return (
		<div className="rightSideCard">
			<div className="infoCardContainer">
				<div className="infoPage">
				<Carousel dotPosition={'top'}>
					{UserInfo.images.map((image) => (
							image &&
					<div className="fiximg">
						<img alt="img-card" className="imgCard" src={`${SER.PicPath}/${image}`} />
					</div>
					))}
				</Carousel>
				<div className="rowboxCard" style={{ marginTop: '15px' }}>
					<h2 className="fisrtNameCard"> {UserInfo.firstName}</h2>
					<h4 style={{ margin: '10px' }} className="smallfontCard">
					{UserInfo.age}
					</h4>
				</div>
				<div className="rowboxCard">
					<EnvironmentTwoTone style={{ fontSize: '1.7rem' }} />
					<h4 className="smallfontCard" style={{ color: '#a3a3a3' }}>
					{UserInfo.distance_in_km} kilometers away
					</h4>
				</div>
				<div
					style={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'space-between',
					marginRight: '15px',
					marginLeft: '15px',
					}}
				>
					{Tags.map((tag) => (
					<Tag
						color="blue"
						style={{
						height: '25px',
						width: '70px',
						fontSize: '120%',
						marginTop: '5px',
						padding: '2px 0px',
						textAlign: 'center',
						}}
					>
						{tag}
					</Tag>
					))}
				</div>
				<Divider orientation="center">Status</Divider>
				<div className="rowboxCard">
					<h4 style={{ color: '#939292', fontSize: '1.3rem' }}>
					{UserInfo.biography}
					</h4>
				</div>
				<Divider />
				</div>

				<div className="personReactions">
					<div className="likePerson" onClick={handleBlockClick}>
						<MinusCircleTwoTone  twoToneColor="#f70025"/>
					</div>
					<div className="likePerson" onClick={handleLikeClick}>
						<HeartTwoTone twoToneColor="#0cce8a" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Infocard
