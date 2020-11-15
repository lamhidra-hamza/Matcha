import React, { useState, useEffect } from 'react'
import Home from './pages/home/Home.js'
import './App.less';
import MainApp from './mainApp/Mainapp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {

  const [width, setWidth] = useState(window.innerWidth);

  const resizeListener = () => {
    setWidth(window.innerWidth);
  };

  window.addEventListener('resize', resizeListener);

  return (
    <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home mobile={width < 768}/>
            </Route>
            <Route path="/app">
              <MainApp width={width}/>
            </Route>
          </Switch>
        </div>
      </Router>
  )
}

export default App
