import React from 'react';
import './ProfileInfo.scss';
import LikeViewItems from '../likeAndView/LikeViewItems'
import { Slider, Input, Select, Button } from 'antd';
import { useHistory } from 'react-router-dom'


const { Option } = Select

const ProfileInfo = (props) => {

    const handleChange = () => {
        console.log('done')
    }

    const history = useHistory();

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
                        placeholder="amal@gmail.com"
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
                        placeholder="Amal"
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
                        placeholder="bentbaha"
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
                    <Select
                        defaultValue="lucy"
                        style={{ width: 150 ,
                            marginBottom: '9px',}}
                        onChange={handleChange}
                        >
                        <Option value="men">Men</Option>
                        <Option value="lucy">Women</Option>
                        <Option value="Yiminghe">Men & Women</Option>
                    </Select>
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