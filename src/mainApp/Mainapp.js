import React from 'react'
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'

export default function Mainapp({width}) {

  return (
    <div className="containerMainapp">
      {width > 760 ? <DesktopSection width={width}/> : <MobileSection/>}
    </div>
  )
}

