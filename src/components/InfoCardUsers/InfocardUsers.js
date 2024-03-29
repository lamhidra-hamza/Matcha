import React, {useState, useEffect, useContext} from 'react'
import { Carousel, Tag, Divider, Skeleton, Rate, message} from 'antd'
import axios from 'axios'
import {
  EnvironmentTwoTone,
  HeartTwoTone,
  MinusCircleTwoTone,
} from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import './InfoCardUsers.scss'
import { SER } from '../../conf/config'
import { getData, postData } from '../../tools/globalFunctions'
import { UserContext } from '../../contexts/UserContext';
import { ErrorStatusContext } from '../../contexts/ErrorContext';


const Infocard = (props) => {
	const currentView = props && props.mobile ? "mobile" : "";
	const { id }  = useParams();
	const myId = localStorage.getItem("userId");
	const history = useHistory();
	const [UserInfo, setUserInfo] = useState({});
	const [Tags, setTags] = useState([]);
	const [IsLikedMe, setIsLikedMe] = useState(false);
	const [loading, setloading] = useState(true);
	const { socket } = useContext(UserContext);
	const { setHttpCodeStatus } = useContext(ErrorStatusContext);

	useEffect(() => {
		const source = axios.CancelToken.source();
		let canceled = false;

		async function fetchData(){
			try {
				setloading(true);
				const result = await getData(`api/users/infocard/${id}`, {}, false);
				const tags = await getData(`api/tags/${id}`, {}, false);
				const likedMe = await getData(`api/likes/${id}`, {}, false);
				if (likedMe.data.user.length)
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
			} catch (err) {
				message.error(err?.response?.data?.msg ? err.response.data.msg : "somthing was wrong");
				setHttpCodeStatus(err.response.status);
			}
		}
		if (!canceled)
			fetchData();
		return () => {
			source.cancel();
			canceled = true;
		};
	}, [id, setHttpCodeStatus]);

	const handleBlockClick = async () => {
		await postData(`api/block`, {blocked_user: id})
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

	const handleLikeClick = async () => {
		await postData(`api/likes`, { liked_user: id });
		const result = await postData(`api/notifications`, {
			notifiedId: id,
            type: "like",
		})
		socket.emit("newNotification", {
			userId: myId,
			notifiedUser: id,
			notifyId: result.data.id
		});
		if (IsLikedMe) {
			await postData(`api/matches`, { matched_user: id});
			const resultN = await postData(`api/notifications`, {
				notifiedId: id,
				type: "matche",
			})
			socket.emit("newNotification", {
				userId: myId,
				notifiedUser: id,
				notifyId: resultN.data.id
			});
			const resultNme = await postData(`api/notifications`, {
				notifiedId: myId,
				type: "matche",
			})
			socket.emit("newNotification", {
				userId: myId,
				notifiedUser: myId,
				notifyId: resultNme.data.id
			});
			await postData(`api/chat/new`, { receiver_id: id });
		}
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
		<div className={`${currentView}rightSideCard`}>
			<div className="infoCardContainer">
				<div className="infoPage">
				<Carousel dotPosition={'top'}>
					{UserInfo.images.map((image) => (
							image &&
					<div className="fiximg" key = {image}>
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
				<div className = "fameRate">
					Fame Rate : <Rate allowHalf defaultValue={UserInfo.rate / 20} disabled />
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
