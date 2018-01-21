/* 
  - Cambiar absolutamente todo, pasar el HOC de Player
    a este archivo para que se pueda manipular el player
    desde cualquier parte de la Aplicacion.
  - Pensar como hacerlo
  - Pensar como calmar a Carlos
  - Arreglarselas para pasar el streamUrl y todas las
    otras props desde index o algo asi, pero app no
    se puede dar props a si mismo :P
 */


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
      player: null,
      playerIsPlaying: false,
      playerActiveTrack: {},
      // playerActiveTrack: {
      //   name: 'Nombre del famoso conchudo',
      //   artist: 'Artista en prueba',
      //   streamUrl: 'https://p.scdn.co/mp3-preview/0c58b32cdd0231ce4dc3cc2fe63a71046fd9f586?cid=555776939cf64ea6b39915cf4d5d875d',
      // },
    }
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
  playerTogglePlay = player => {
    this.setState(({ playerIsPlaying }) => {
      this.playerSetPlayer(player)
      if (playerIsPlaying) player.pause()
      if (!playerIsPlaying) player.play()
      
      return { playerIsPlaying: !playerIsPlaying }
    })
  }

  playerTrackOn = newTrack => {
    this.setState(({ player }) => {
      console.log('Song changed')
      this.playerSetPlayer()
      if (player) {
        player.play(newTrack)

        return {
          playerActiveTrack: newTrack,
          playerIsPlaying: false,
        }
      }

      return { playerActiveTrack: newTrack }
    })
  }

  playerSetPlayer = player => {
    this.setState(() => ({ player }))
  }

  
  // Fetch Methods
  fetchData = search => {
    const baseURL = "https://platzi-music-api.now.sh"
    const busqueda = search
      ? `search?q=${search}&type=track`
      : 'users/yupiter01/playlists/0bIBXPHexHTJepMwuH2vi7/tracks'

    fetch(`${baseURL}/${busqueda}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: search
            ? data.tracks.items
            : data.items.map(({ track }) => track)
        })
      })
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
    
    return (
      <Fragment>
        <Navbar
          value={search}
          onChange={this.searchHandleValue}
          onSubmit={this.searchHandleSubmit}
        />

        <section className="track-container">
          {data
            ? data.map(track =>
              <Track
                key={track.id}
                {...track}
                activeTrack={playerActiveTrack.name}
                updateTrack={this.playerTrackOn}
              />)
            : Array(4)
              .fill(undefined)
              .map((_, i) => i)
              .map((_, i) => <TrackLoader key={i} />)
          }
        </section>

        {playerActiveTrack.name && (
          <Player
            streamUrl={playerActiveTrack.streamUrl}
            togglePlay={this.playerTogglePlay}
            setPlayer={this.playerSetPlayer}
            isPlaying={playerIsPlaying}
            track={playerActiveTrack}
            preloadType="auto"
          />
        )}
        
      </Fragment>
    );
  }
}

export default App;
