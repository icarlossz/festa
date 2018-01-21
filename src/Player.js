import React from 'react'
import { Icons, Timer, Progress } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';
import "./Player.css";

class Player extends React.PureComponent {
  componentWillUpdate() {
    this.props.setPlayer(this.props.soundCloudAudio)
    console.log(this.props.soundCloudAudio.playing)
    console.log('New Player!')
  }
  
  render() {
    const { track, ...props } = this.props
    
    return (
      <div className="player-container">
        <Progress className="player-progress" {...props} />
        <div
          className="player-button"
          onClick={() => {
            props.togglePlay(props.soundCloudAudio)
          }}
        >
          {props.playing
            ? <Icons.PauseIconSVG />
            : <Icons.PlayIconSVG />
          }
        </div>
        <div className="player-info">
          <h2 className="player-title">{track.name}</h2>
          <h5 className="player-artist">{track.artist}</h5>
        </div>
        <Timer className="player-timer" {...props} />
      </div>
    )
  }
}

export default withCustomAudio(Player)