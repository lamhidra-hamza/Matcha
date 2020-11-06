import React from 'react'
import './Mainapp.css'
import Maintab from '../components/mainTab/Maintab.js'
import NavbarApp from '../components/navbarApp/NavbarApp'



export default function Mainapp() {
    return (
        <div className="containerMainapp">
            <div className="mainRow">
                <div className="leftSide">
                    <NavbarApp/>
                    <Maintab/>
                </div>
                <div className="main">
                    
                </div>
            </div>
        </div>
    )
}

