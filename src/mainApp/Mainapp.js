import React, { useState, useEffect } from 'react'
import './Mainapp.scss'
import MobileSection from '../components/mobileSection/MobileSection'
import DesktopSection from '../components/desktopSection/DesktopSection'
import {BrowserRouter as Router, Route, useRouteMatch, Switch, Redirect} from 'react-router-dom';

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

  let match = useRouteMatch();

  return (
    <div className="containerMainapp">
      {width > 760 ? <Redirect to={`${match.url}/desktop`} /> : <Redirect to={`${match.url}/mobile`} />}
      <Switch>
        <Route path={`${match.url}/desktop`}>
          <DesktopSection width={width}/>
        </Route>
        <Route path={`${match.url}/mobile`}>
          <MobileSection/>
        </Route>
      </Switch>
    </div>
  )
}
