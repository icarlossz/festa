import React from 'react';
import './Player.css'
import { Icons, Timer, Progress } from 'react-soundplayer/components';

const Player = props => {
  return(
    <div className="player-container">
      <Progress className="player-progress" {...props} />
      <div
        className="player-button"
        onClick={() => props.togglePlay()}
      >
        {props.playing
          ? <Icons.PauseIconSVG />
          : <Icons.PlayIconSVG />
        }
      </div>
      <div className="player-info">
        <h2 className="player-title">{props.name}</h2>
        <h5 className="player-artist">{props.artist}</h5>
      </div>
      <Timer className="player-timer" {...props} />
    </div>
  )
}

export default Player;