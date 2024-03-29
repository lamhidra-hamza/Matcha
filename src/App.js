import React, { useState, useEffect } from 'react'
import Home from './pages/home/Home.js'
import './App.less';
import MainApp from './mainApp/Mainapp'
import NotFound from './pages/error/NotFound.js';
import ErrorHandler from './errorHandler/ErrorHandler'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  
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
    <Router>
      <div className="App">
        <ErrorHandler>
          <Switch>
            <Route exact path="/">
              <Home mobile={width < 760}/>
            </Route>
            <Route path="/app">
                <MainApp width={width}/>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </ErrorHandler>
      </div>
    </Router>
  )
}

export default App
