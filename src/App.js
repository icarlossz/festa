import React, { Component } from 'react';
import ContentLoader from "react-content-loader"
import './App.css';

const MyLoader = () => (
  <ContentLoader
    height={400}
    width={300}
    speed={2}
    primaryColor={"#f3f3f3"}
    secondaryColor={"#ecebeb"}
    className={'track-item'}
  >
    <rect x="0" y="0"  width="300" height="400" />
  </ContentLoader>
)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null
    }
  }

  fetchData = () => {
    fetch('https://platzi-music-api.now.sh/users/yupiter01/playlists/0bIBXPHexHTJepMwuH2vi7/tracks')
      .then(res => {
        res = res.json().then(data => {
          this.setState({data})
        })
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <nav className="navbar">
          <h3 className="navbar-title">Festa</h3>
          <input className="navbar-search" type="text" placeholder="Search..."/>
          <p className="navbar-user">O</p>
        </nav>
        <div className="track-container">
          { !this.state.data && (
            <React.Fragment>
              <MyLoader />
              <MyLoader />
              <MyLoader />
            </React.Fragment>
          ) }
        </div>
        
      </div>
    );
  }
}

export default App;
