import React from 'react'
import { PlayButton, Timer, Progress } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';
import "./Player.css";

const Player = (props) => (
  <div className="player-container">
    <Progress className="player-progress" {...props} />
    <PlayButton className="player-button" {...props} />
    <div className="player-info">
      <h2 className="player-title">{props.trackTitle}</h2>
      <h5 className="player-artist">{props.trackArtist}</h5>
    </div>
    <Timer className="player-timer" {...props} />
  </div>
)

export default withCustomAudio(Player)