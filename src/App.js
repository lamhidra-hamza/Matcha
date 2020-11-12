import React, {Component} from 'react'
import Home from './pages/home/Home.js'
import './App.less';
import MainApp from './mainApp/Mainapp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  state = {
    mobile: window.innerWidth < 768,
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.setState({mobile: true});
      } else {
        this.setState({mobile: false});
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home mobile={this.state.mobile}/>
            </Route>
            <Route path="/app">
              <MainApp mobile={this.state.mobile}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
