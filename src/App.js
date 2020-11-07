import React, {Component} from 'react'
import Home from './pages/home/Home.js'
import './App.less';
import MainApp from './mainApp/Mainapp'


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
        {/* <Home mobile={this.state.mobile}/> */}
        <MainApp />
      </div>
    );
  }
}

export default App;
