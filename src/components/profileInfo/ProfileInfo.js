import React, { useState, useEffect } from 'react';
import './ProfileInfo.scss';
import LikeViewItems from '../likeAndView/LikeViewItems'
import { Slider, Input, Select, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import {SER} from '../../conf/config';



const { Option } = Select

const ProfileInfo = (props) => {
    const id = "07c51ce5-4f7b-4d7a-81f4-2a51c41f76c2";
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getData = async () => {
            const result = await axios.get(`${SER.HOST}/api/users/${id}`)
            setUser(result.data.user);
        }

        getData();

        return () => {
            source.cancel();
        }
    }, [])
    
    const handleChange = () => {
        console.log('done')
    }

    const saveButtonClick = () => {
        history.goBack();
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
                    /> 
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >Password</h3>
                    <Input
                        placeholder="........"
                        style={{
                            height: '2vh',
                            borderRadius: '10px',
                            width: '200px',
                            border: '0px',
                            textAlign: 'right',
                            marginBottom: '9px',
                        }}
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
                        <h3 className="boxValue" >11 km.</h3>
                    </div>
                    <Slider defaultValue={30} style={{marginBottom: '15px',}}/>
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >Loking for</h3>
                    {user.interessted &&
                    <Select
                        defaultValue={user.interessted}
                        style={{ width: 150 ,
                            marginBottom: '9px',}}
                        onChange={handleChange}
                        >
                        <Option value="men">Men</Option>
                        <Option value="women">Women</Option>
                        <Option value="both">Men & Women</Option>
                    </Select>}
                </div>
                <div className="setBox borderTopNone columnsetBox">
                    <div className="rowsetBox">
                        <h3 className="boxParam" >Age Range</h3>
                        <h3 className="boxValue" >18-39</h3>
                    </div>
                    <Slider
                        range
                        step={1}
                        min={18}
                        max={39}
                        defaultValue={[22, 28]}
                        style={{marginBottom: '15px',}}
                        />
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfileInfo;