import React, { Fragment, Component } from 'react';
import { Track, TrackLoader } from "./Track";
import Navbar from "./Navbar";
import Player from "./Player";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: null,
      search: '',
      playerIsPlaying: false,
      playerActiveTrack: {
        name: 'Eleonor',
        artist: 'Artista de prueba',
        src: 'https://p.scdn.co/mp3-preview/0c58b32cdd0231ce4dc3cc2fe63a71046fd9f586?cid=555776939cf64ea6b39915cf4d5d875d',
      },
      // playerActiveTrack: null,
    }
  }

  fetchData = search => {
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

  
  // Search Methods
  searchHandleValue = ({ target }) => {
    this.setState({ search: target.value })
  }

  searchHandleSubmit = ({ key }) => {
    if (key === 'Enter') {
      this.setState({ data: null })
      this.fetchData(this.state.search)
    }
  }


  // Player Methods
  playerTogglePlay = element => {
    const { isPlaying } = this.state
    // isPlaying ? element.play() : element.pause()
    this.setState({ playerIsPlaying: !isPlaying })
    return !isPlaying
  }

  playerTrackOn = newTrack => {
    this.setState({ playerActiveTrack: newTrack })
  }
  

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const {
      data,
      search,
      playerIsPlaying,
      playerActiveTrack,
    } = this.state
    console.log(`Search: ${search}`)
    console.log(`Playing: ${playerIsPlaying}`)
    
    return (
      <Fragment>
        <Navbar
          value={search}
          onChange={this.searchHandleValue}
          onSubmit={this.searchHandleSubmit}
        />

        <section className="track-container">
          {data
            ? data.map(track => <Track key={track.id} {...track} />)
            : Array(4)
              .fill(undefined)
              .map((_, i) => i)
              .map((_, i) => <TrackLoader key={i} />)
          }
        </section>

        {
          playerActiveTrack && (
            <Player
              streamUrl={playerActiveTrack.src}
              trackTitle={playerActiveTrack.name}
              trackArtist={playerActiveTrack.artist}
              preloadType="auto"
            />
          )
        }
        
      </Fragment>
    );
  }
}

export default App;
