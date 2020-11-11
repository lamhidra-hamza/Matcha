import React, { useState, useEffect } from 'react'
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'

export default function Mainapp() {
  
   const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

  const [width, setWidth] = useState(getWidth());

   useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth())
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  })

  return (
    <div className="containerMainapp">
      {width > 760 ?
      <DesktopSection width={width}/> : <MobileSection/>}
    </div>
  )
}
