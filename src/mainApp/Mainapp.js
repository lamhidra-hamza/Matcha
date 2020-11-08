import React, { useState, useEffect } from 'react'
import './Mainapp.css'
import Maintab from '../components/mainTab/Maintab.js'
import NavbarApp from '../components/navbarApp/NavbarApp'
import ProfileInfo from '../components/profileInfo/ProfileInfo'

export default function Mainapp() {
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div className="containerMainapp">
            <div className="mainRow">
                <div className="leftSide">
                    <NavbarApp setShowProfile={setShowProfile} showProfile={showProfile}/>
                    {showProfile ? <ProfileInfo/> : <Maintab/>}
                </div>
                <div className="main">
                    
                </div>
            </div>
        </div>
    )
}

