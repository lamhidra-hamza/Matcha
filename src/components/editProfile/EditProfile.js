import React, { useState, useContext } from "react";
import "./EditProfile.scss";
import ProfileImgItem from "../profileImgItem/profileImgItem";
import ProfileImgEmpty from "../profileImgIEmpty/profileImgIEmpty";
import { Slider, Input, Select, Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { uploadPictures } from "../../tools/globalFunctions";
import { UserContext } from '../../contexts/UserContext';
import { SER } from '../../conf/config';


export default function EditProfile(props) {
	const currentView = props && props.mobile ? "mobile" : "";
	const userContext = useContext(UserContext);
	const userImages = userContext.userImages;
	const setUserImages = userContext.setUserImages;
	const picHost = `${SER.PicPath}`;

	const [images, setImages] = useState([
		{
			preview: null,
			file: null,
		},
		{
			preview: null,
			file: null,
		},
		{
			preview: null,
			file: null,
		},
		{
			preview: null,
			file: null,
		},
		{
			preview: null,
			file: null,
		},
	]);

	const howa = userImages ? [
		userImages.picture_1,
		userImages.picture_2,
		userImages.picture_3,
		userImages.picture_4,
		userImages.picture_5] : ["", "", "", "", ""];

	const [imageLink, setImageLink] = useState(howa);

	const RenderProfileImage = ({ index }) => {
		if (images[index].preview) {
			return (
				<ProfileImgItem
					key={index}
					view={currentView}
					link={images[index].preview}
					id={index}
					clear={() => clearImage(index)}
				/>
			);
		}
		if (imageLink[index]) {
			return (
				<ProfileImgItem
					key={index}
					view={currentView}
					link={`${picHost}/${imageLink[index]}`}
					id={index}
					clear={() => clearImage(index)}
				/>
			);
		}
		return (
			<ProfileImgEmpty
				key={index}
				view={`${currentView}`}
				id={index}
				add={(preview, file) => addNewImage(preview, file, index)}
			/>
		);
	};

	const addNewImage = async (preview, file, index) => {
		console.log(`the index is ${index}`);
		let newImages = [...images];
		newImages[index].preview = preview;
		newImages[index].file = file;
		setImages(newImages);
	};

	const clearImage = (index) => {
		let newImages = [...images];
		let newImagesLink = [...imageLink];

		newImages[index] = { preview: null, file: null };
		newImagesLink[index] = null;
		setImages(newImages);
		setImageLink(newImagesLink);
	};

	const history = useHistory();

	const { Option } = Select;

	const saveButtonClick = async () => {
		await axios.put(`${SER.HOST}/api/pictures/${userImages.id}`,
			{...userImages,
				picture_1: imageLink[0],
				picture_2: imageLink[1],
				picture_3: imageLink[2],
				picture_4: imageLink[3],
				picture_5: imageLink[4]
			});
		const formData = new FormData();
		images.map((image) => {
		  if (image.file) formData.append("image", image.file);
		});
		const result = await uploadPictures(formData, userImages.id);
		setUserImages({
			...userImages,
			picture_1: result.data.arr[0] ? result.data.arr[0] : null,
			picture_2: result.data.arr[1] ? result.data.arr[1] : null,
			picture_3: result.data.arr[2] ? result.data.arr[2] : null,
			picture_4: result.data.arr[3] ? result.data.arr[3] : null,
			picture_5: result.data.arr[4] ? result.data.arr[4] : null
		})
		history.goBack();
	};

	const handleChange = () => {
		console.log("done!!");
	};

	return (
		<div className={`${currentView}editProfileContainer`}>
			<div className="editProfileCard">
				<div className="EditProfileInfo">
					<div className="profileImgs">
						<RenderProfileImage index={0} />
						<RenderProfileImage index={1} />
						<RenderProfileImage index={2} />
						<RenderProfileImage index={3} />
						<RenderProfileImage index={4} />
					</div>
					<div className="profileInfoConatainer">
						<div className="accountSet">
							<h2 className="setTitle">ACCOUNT SETTINGS</h2>
							<div className="setBox rowsetBox">
								<h3 className="boxParam">Email</h3>
								<Input
									placeholder="amal@gmail.com"
									style={{
										height: "2vh",
										borderRadius: "10px",
										width: "200px",
										border: "0px",
										textAlign: "right",
									}}
								/>
							</div>
							<div className="setBox borderTopNone rowsetBox">
								<h3 className="boxParam">Password</h3>
								<Input
									placeholder="........"
									style={{
										height: "2vh",
										borderRadius: "10px",
										width: "200px",
										border: "0px",
										textAlign: "right",
									}}
								/>
							</div>
							<div className="setBox borderTopNone rowsetBox">
								<h3 className="boxParam">First Name</h3>
								<Input
									placeholder="Amal"
									style={{
										height: "2vh",
										borderRadius: "10px",
										width: "200px",
										border: "0px",
										textAlign: "right",
									}}
								/>
							</div>
							<div className="setBox borderTopNone rowsetBox">
								<h3 className="boxParam">Last Name</h3>
								<Input
									placeholder="bentbaha"
									style={{
										height: "2vh",
										borderRadius: "10px",
										width: "200px",
										border: "0px",
										textAlign: "right",
									}}
								/>
							</div>
						</div>
						<div className="accountSet">
							<h2 className="setTitle">DISCOVERY SETTINGS</h2>
							<div className="setBox rowsetBox">
								<h3 className="boxParam">Location</h3>
								<h3 className="boxValue">Marrakech, Morocco</h3>
							</div>
							<div className="setBox columnsetBox borderTopNone">
								<div className="rowsetBox">
									<h3 className="boxParam">Maximun Distance</h3>
									<h3 className="boxValue">11 km.</h3>
								</div>
								<Slider defaultValue={30} />
							</div>
							<div className="setBox borderTopNone rowsetBox">
								<h3 className="boxParam">Looking for</h3>
								<Select
									defaultValue="lucy"
									style={{ width: 150 }}
									onChange={handleChange}
								>
									<Option value="men">Men</Option>
									<Option value="lucy">Women</Option>
									<Option value="Yiminghe">Men & Women</Option>
								</Select>
							</div>
							<div className="setBox borderTopNone columnsetBox">
								<div className="rowsetBox">
									<h3 className="boxParam">Age Range</h3>
									<h3 className="boxValue">18-39</h3>
								</div>
								<Slider
									range
									step={1}
									min={18}
									max={39}
									defaultValue={[22, 28]}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="floatBtn">
					<Button
						shape="round"
						className={`${currentView}saveProfileBtn`}
						onClick={saveButtonClick}
					>
						Save
          </Button>
				</div>
			</div>
		</div>
	);
}
