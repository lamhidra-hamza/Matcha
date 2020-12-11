import React, { useState, useEffect } from 'react';
import './ProfileInfo.scss';
import LikeViewItems from '../likeAndView/LikeViewItems'
import { Slider, Input, Select, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { SER } from '../../conf/config';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';




const { Option } = Select

const ProfileInfo = (props) => {
    const [email, setEmailValue] = useState("");
    const [password, setPassValue] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const history = useHistory();
    const { user, setUser } = props;

    const interestingChange = (value) => {
        setUser({...user, interessted: value})
    }

    const saveButtonClick = () => {
        history.goBack();
    }

    const emailUpdate = () => {
        setUser({...user, email: email});
        setEmailValue("");
    }

    const passwordUpdate = () => {
        setUser({...user, password: password});
        setPassValue("");
    }

    const firstNameUpdate = () => {
        setUser({...user, firstName: firstName});
        setFirstname("");
    }

    const lastNameUpdate = () => {
        setUser({...user, lastName: lastName});
        setLastname("");
    }

    const handelEmailChange = ({target: {value}}) => {
        setEmailValue(value);
    }
    const handelPassChange = ({target: {value}}) => {
        setPassValue(value);
    }

    const handelFirstChange = ({target: {value}}) => {
        setFirstname(value);
    }

    const handelLastChange = ({target: {value}}) => {
        setLastname(value);
    }

    const AgeRangeChange = (range) => {
        setUser({...user, minAge: range[0], maxAge: range[1]})
    }

    const handelDistanceChange = (dis) => {
        setUser({...user, maxDistance: dis})
    }

    return (
        <>

        <div style={{ width: props && props.mobile ? '100%' : '400px' }}
            className="profileInfoConatainer">
            {props && props.mobile &&
            <div className="floatBtn">
                <Button shape="round" className={'saveProfileBtn'} onClick={saveButtonClick}>
                    Save
                </Button>
            </div>}
            <LikeViewItems/>
            <div className="accountSet">
                <h2 className="setTitle">ACCOUNT SETTINGS</h2>
                <div className="setBox rowsetBox">
                    <h3 className="boxParam" >Email</h3>
                    <Input
                        placeholder={user.email}
                        style={{
                            height: '2vh',
                            borderRadius: '10px',
                            width: '200px',
                            border: '0px',
                            textAlign: 'right',
                            marginBottom: '9px',
                        }}
                        disabled={false}
                        value={email}
                        onChange={handelEmailChange}
                        onPressEnter={emailUpdate}
                    /> 
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >Password</h3>
                    <Input.Password
                        placeholder="     input password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        style={{
                            height: '2vh',
                            borderRadius: '10px',
                            width: '200px',
                            border: '0px',
                            textAlign: 'right',
                            marginBottom: '9px',
                        }}
                        value={password}
                        onChange={handelPassChange}
                        onPressEnter={passwordUpdate}
                        />
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >First Name</h3>
                    <Input
                        placeholder={user.firstName}
                        style={{
                            height: '2vh',
                            borderRadius: '10px',
                            width: '200px',
                            border: '0px',
                            textAlign: 'right',
                            marginBottom: '9px',
                        }}
                        value={firstName}
                        onChange={handelFirstChange}
                        onPressEnter={firstNameUpdate}
                    />
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >Last Name</h3>
                    <Input
                        placeholder={user.lastName}
                        style={{
                        height: '2vh',
                        borderRadius: '10px',
                        width: '200px',
                        border: '0px',
                        textAlign: 'right',
                        marginBottom: '9px',
                        }}
                        value={lastName}
                        onChange={handelLastChange}
                        onPressEnter={lastNameUpdate}
                    />
                </div>
            </div>
            <div className="accountSet">
                <h2 className="setTitle">DISCOVERY SETTINGS</h2>
                <div className="setBox rowsetBox">
                    <h3 className="boxParam" >Location</h3>
                    <h3 className="boxValue" >Marrakech, Morocco</h3>
                </div>
                <div className="setBox columnsetBox borderTopNone">
                    <div className="rowsetBox">
                        <h3 className="boxParam" >Maximun Distance</h3>
                    <h3 className="boxValue" >{user.maxDistance} km.</h3>
                    </div>
                    {user.maxDistance &&
                    <Slider max={200} defaultValue={user.maxDistance} onChange={handelDistanceChange} style={{marginBottom: '15px',}}/>}
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >Loking for</h3>
                    {user.interessted &&
                    <Select
                        defaultValue={user.interessted}
                        style={{ width: 150 ,
                            marginBottom: '9px',}}
                        onChange={interestingChange}
                        >
                        <Option value="men">Men</Option>
                        <Option value="women">Women</Option>
                        <Option value="both">Men & Women</Option>
                    </Select>}
                </div>
                <div className="setBox borderTopNone columnsetBox">
                    <div className="rowsetBox">
                        <h3 className="boxParam" >Age Range</h3>
                        <h3 className="boxValue" >{user.minAge}-{user.maxAge}</h3>
                    </div>
                    {user.minAge && user.maxAge &&
                    <Slider
                        range
                        step={1}
                        min={18}
                        max={39}
                        defaultValue={[user.minAge, user.maxAge]}
                        style={{marginBottom: '15px',}}
                        onChange={AgeRangeChange}
                        />}
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfileInfo;