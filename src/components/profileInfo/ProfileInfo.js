import React from 'react';
import './ProfileInfo.scss';
import LikeViewItems from '../likeAndView/LikeViewItems'
import { Slider } from 'antd';


const ProfileInfo = () => {
    return (
        <div className="profileInfoConatainer">
            <LikeViewItems/>
            <div className="accountSet">
                <h2 className="setTitle">ACCOUNT SETTINGS</h2>
                <div className="setBox rowsetBox">
                    <h3 className="boxParam" >Email</h3>
                    <h3 className="boxValue" >Amal-boox@gmail.com</h3>
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >Password</h3>
                    <h3 className="boxValue" >. . . . . . .</h3>
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >First Name</h3>
                    <h3 className="boxValue" >Amal</h3>
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >Last Name</h3>
                    <h3 className="boxValue" >BentBaha</h3>
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
                    <Slider defaultValue={30}/>
                </div>
                <div className="setBox borderTopNone rowsetBox">
                    <h3 className="boxParam" >Loking for</h3>
                    <h3 className="boxValue" >Men</h3>
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
                        defaultValue={[22, 28]}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;