import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { Select, Slider, Rate, Checkbox, Spin } from 'antd'
import './FilterPopUp.scss'
import { getData } from "../../tools/globalFunctions"

export default function FilterPopUp(props) {
	const { Option } = Select
	const { filterParams, setFilerParams, sortedBy, setSortedBy } = props;

	const [sortValue, setSortValue] = useState(sortedBy);
	const [loading, setLoading] = useState(true);
	const [alltags, setAlltags]  = useState([]);
	const [newFilterParams, setNewFilterParams] =  useState(filterParams);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const result = await getData('api/tags/all', {}, false);
			setAlltags(result.data.tags);
			setLoading(false);
		}

		fetchData();
		
		}, [])

	function handleSortChange(key, value) {
		setSortValue(
		sortValue.map((item, index) => {
			if (index === key) return value
			else return false
		}),
		)
		if (key === 0 && value)
			setNewFilterParams({...newFilterParams, sortedBy: 'tags'});
		if (key === 1 && value)
			setNewFilterParams({...newFilterParams, sortedBy: 'distance'});
		if (key === 2 && value)
			setNewFilterParams({...newFilterParams, sortedBy: 'age'});
		if (key === 3 && value)
			setNewFilterParams({...newFilterParams, sortedBy: 'frameRate'});
		if (!value)
			setNewFilterParams({...newFilterParams, sortedBy: ''});
	}

	const children = []
	for (let i = 10; i < 36; i++) {
		children.push(
		<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
		)
	}

	function handleTagsChange(value) {
		let arr = [];
		Object.keys(value).forEach(function(key, index) {
			if (isNaN(value[key]))
				arr.push(value[key])
			else
				arr.push(alltags[value[key] - 1].tag);
		  });
		setNewFilterParams({...newFilterParams, tags: arr});
	}

	function getStyle() {
		return {
		textAlign: 'center',
		borderRadius: '50px',
		height: '80%',
		maxWidth: '700px'
		}
	}

	const handleOk = () => {
		setFilerParams(newFilterParams);
		setSortedBy(sortValue);
		props.handleCancel();
	}

	const handleDistanceChange = (value) => {
		setNewFilterParams({...newFilterParams, maxDistance: value});
	}

	const handleAgeChange = (value) => {
		setNewFilterParams({...newFilterParams, minAge: value[0], maxAge: value[1]})
	}

	const handleRateChange = (value) => {
		setNewFilterParams({...newFilterParams, frameRate: value});
	}

	if (loading)
		return (<div className="filterpopup"> 
					<div className="loading">
						<Spin size="large" />
					</div>
				</div>)


	return (
		<div className="filterpopup">
		<Modal
			visible={props.visible}
			onCancel={props.handleCancel}
			bodyStyle={getStyle()}
			centered={true}
			onOk={handleOk}
			
		>
			<div className="filterUsers">
			<div className="filterRow">
				<h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>Tags: </h4>
				<Select
					mode="tags"
					style={{ width: '50%', margin: '4px', marginRight: '5px' }}
					placeholder="Enter Your Tags"
					onChange={handleTagsChange}
					loading={loading}
					defaultValue={newFilterParams.tags}
						>
						{alltags.map(item => {return (<Option key={item.id}>{item.tag}</Option>)})}
				</Select>
			</div>
			<div className="filterRow">
				<h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>
				Distance (km):{' '}
				</h4>
				<Slider
					defaultValue={newFilterParams.maxDistance}
					style={{ width: '50%' }}
					max={150}
					onAfterChange={handleDistanceChange} />
			</div>
			<div className="filterRow">
				<h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>Age: </h4>
				<Slider
					style={{ width: '50%'}}
					range
					step={1}
					min={18}
					max={40}
					defaultValue={[newFilterParams.minAge, newFilterParams.maxAge]}
					onAfterChange={handleAgeChange}
				/>
			</div>
			<div className="filterRow">
				<h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>Fame Rate: </h4>
				<div className="fameRate">
				<Rate
					allowHalf
					defaultValue={newFilterParams.frameRate}
					style={{ fontWeight: '900', color: '#f8a9ac' }}
					onChange={handleRateChange}
				/>
				</div>
			</div>
			<div className="filterRow">
				<h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>Sort by: </h4>
				<div className="sortBy">
				<Checkbox
					checked={sortValue[0]}
					onChange={() => handleSortChange(0, !sortValue[0])}
				>
					Tags
				</Checkbox>
				<Checkbox
					checked={sortValue[1]}
					onChange={() => handleSortChange(1, !sortValue[1])}
				>
					Distance
				</Checkbox>
				<Checkbox
					checked={sortValue[2]}
					onChange={() => handleSortChange(2, !sortValue[2])}
				>
					Age
				</Checkbox>
				<Checkbox
					checked={sortValue[3]}
					onChange={() => handleSortChange(3, !sortValue[3])}
				>
					Fame Rate
				</Checkbox>
				</div>
			</div>
			</div>
		</Modal>
		</div>
	)
}
