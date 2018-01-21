import React, { Fragment, Component } from "react";
import { Track, TrackLoader } from "./Track";
import { withCustomAudio } from 'react-soundplayer/addons';
import Player from './Player'
import './App.css'
import Navbar from './Navbar'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTrack: null,
      data: null,
      isPlaying: false,
      search: '',
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
  updateActiveTrack = newTrack => {
    if (this.state.activeTrack && this.state.activeTrack.name === newTrack.name) {
      this.playerTogglePlay()
      return true
    }
  
    this.props.soundCloudAudio.play(newTrack)
    this.setState({ activeTrack: newTrack, isPlaying: true })
  }

  playerTogglePlay = () => {
    this.setState(({ isPlaying, activeTrack }) => {
      if (!isPlaying){
        this.props.soundCloudAudio.play(activeTrack)
        return { isPlaying: true }
      } else if (isPlaying) {
        this.props.soundCloudAudio.pause()
        return { isPlaying: false }
      }
    })
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
    return (
      <Fragment>
        <Navbar
          value={this.state.search}
          onChange={this.searchHandleValue}
          onSubmit={this.searchHandleSubmit}
        />
        <section className="track-container">
          {this.state.data
            ? this.state.data.map(track =>
              <Track
                key={track.id}
                updateTrack={this.updateActiveTrack}
                togglePlay={this.playerTogglePlay}
                playing={this.props.soundCloudAudio.playing}
                activeTrackName={this.state.activeTrack
                  ? this.state.activeTrack.name
                  : null
                }
                {...track}
              />)
            : Array(4)
              .fill(undefined)
              .map((_, i) => i)
              .map((_, i) => <TrackLoader key={i} />)
          }
          {(this.state.data && this.state.data.length === 0) && <p>No Results found...</p>}
        </section>
        {
          this.state.activeTrack && <Player
            togglePlay={this.playerTogglePlay}
            {...this.props.soundCloudAudio}
            {...this.state.activeTrack}
            {...this.props}
          />
        }
      </Fragment>
    )
  }
}

export default withCustomAudio(App);