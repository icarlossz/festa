import React, { Component } from 'react';
import { Track, TrackLoader } from "./Track";
import Navbar from "./Navbar";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = { data: null, search: '' }
  }

  fetchData = (search) => {
    const baseURL = "https://platzi-music-api.now.sh"
    const patito = search
      ? `search?q=${search}&type=track`
      : 'users/yupiter01/playlists/0bIBXPHexHTJepMwuH2vi7/tracks'
    
    fetch(`${baseURL}/${patito}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          data: search
            ? data.tracks.items
            : data.items.map(({ track }) => track)
        })
      })
  }

  handleSearchValue = ({ target }) => {
    this.setState({ search: target.value })
  }

  handleSearchGo = ({ key }) => {
    if (key === 'Enter') {
      this.setState({ data: null })
      this.fetchData(this.state.search)
    }
  } 

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { data, search } = this.state
    console.log(search)
    
    return (
      <div className="App">
        <Navbar
          value={search}
          onChange={this.handleSearchValue}
          onSubmit={this.handleSearchGo}
        />

        <div className="track-container">
          {data
            ? data.map(track => <Track key={track.id} {...track} />)
            : (
            <React.Fragment>
              <TrackLoader />
              <TrackLoader />
              <TrackLoader />
              <TrackLoader />
            </React.Fragment>
          )}
        </div>
        
      </div>
    );
  }
}

export default App;
