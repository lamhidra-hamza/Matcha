import React from 'react'
import './DisplayUsers.css'
import UserCard from '../userCard/UserCard.js'
import { Select, Slider } from 'antd';

const DisplayUsers = () => {
    const { Option } = Select;

    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <div className="DusersContainer">
            <div className="filterUsers">
                <div className="filterRow">
                    <h4 style={{fontWeight: '900'}}>Tags: </h4>
                    <Select mode="tags" style={{ width: '50%' , margin: '4px', marginRight: '5px'}} placeholder="Enter Your Tags" onChange={handleChange}>
                        <Option>Travel</Option>
                        <Option>Music</Option>
                        <Option>Driving</Option>
                    </Select>
                </div>
                <div className="filterRow">
                    <h4 style={{fontWeight: '900'}}>Distance (km): </h4>
                    <Slider defaultValue={30} style={{width: '50%'}} />
                </div>
                <div className="filterRow">
                    <h4 style={{fontWeight: '900'}}>Age: </h4>
                    <Slider style={{width: '50%'}}
                            range
                            step={1}
                            min={18}
                            max={39}
                            defaultValue={[22, 28]}/>
                </div>
            </div>
            <div className="dusersContent">
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
            </div>
        </div>
    )
}

export default DisplayUsers
