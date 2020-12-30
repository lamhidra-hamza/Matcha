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
import { putData, postData } from "../../tools/globalFunctions";


export default function EditProfile(props) {
	const currentView = props && props.mobile ? "mobile" : "";
	const { userImages, user, setUserImages, setUser, tags, setTags } = useContext(UserContext);

	const picHost = `${SER.PicPath}`;

	const [about, setabout] = useState(user.biography);
	const [gender, setGender] = useState(user.gender);
	const [jobtitle, setJobtitle] = useState(user.job);
	const [newTags, setNewTags] = useState(tags);
 
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
		await putData(`api/pictures/${userImages.id}`,
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
		setUser({...user, biography: about, gender: gender, job: jobtitle});
		await postData(`api/tags/`, newTags);
		setTags(newTags);
		history.goBack();
	};

	const handleGenderChange = (value) => {
		setGender(value);
	};

	const handleAboutChange = ({target: {value}}) => {
		setabout(value);
	}

	const handelJobChange = ({target: {value}}) => {
		setJobtitle(value);
	}

	const handleTagChange = (value) => {
		setNewTags(value);
		console.log("new tag => ", value);
	}

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
							<h2 className="setTitle">ABOUT {user.firstName.toUpperCase()}</h2>
							<div className="setBox rowsetBox ">
								<Input.TextArea
									rows={4}
									placeholder={user.biography}
									style={{
										height: "4vh",
										borderRadius: "0px",
										width: "100%",
										border: "0px",
										textAlign: "left",
									}}
									value={about}
									onChange={handleAboutChange}
								/>
							</div>
						</div>
						<div className="accountSet">
							<h2 className="setTitle">JOB TITLE</h2>
							<div className="setBox rowsetBox">
								<Input
									placeholder={user.job}
									onChange={handelJobChange}
									value={jobtitle}
									/>
							</div>
						</div>
						<div className="accountSet">
							<h2 className="setTitle">Tags</h2>
							<div className="setBox rowsetBox">
							<Select
								mode="tags"
								style={{ width: '100%', margin: '4px', marginRight: '5px' }}
								placeholder="Enter Your Tags"
								onChange={handleTagChange}
								defaultValue={newTags}
								>
								</Select>
							</div>
						</div>
						<div className="accountSet">
							<h2 className="setTitle">Gender</h2>
							<div className="setBox rowsetBox">
								<Select
									defaultValue={user.gender}
									style={{ width: '100%' }}
									onChange={handleGenderChange}
								>
									<Option value="man">Man</Option>
									<Option value="woman">Woman</Option>
									<Option value="other">Other</Option>
								</Select>
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
