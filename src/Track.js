import React from 'react';
import ContentLoader from 'react-content-loader';
import { Icons } from 'react-soundplayer/components';
import './Track.css';

export const TrackLoader = () => (
  <ContentLoader
    height={400}
    width={300}
    speed={2}
    primaryColor={"#f3f3f3"}
    secondaryColor={"#ecebeb"}
    className={'track-item'}
  >
    <rect x="0" y="0" width="300" height="400" />
  </ContentLoader>
)

export const Track = (props) => {
  return (
    <div className="track-item">
      {props.preview_url && (
        <div
          className="track-player"
          active={(props.activeTrackName === props.name).toString()}
          onClick={() => props.updateTrack({
            name: props.name,
            artist: props.artists[0].name,
            streamUrl: props.preview_url,
          })}
        >
          {
            props.playing
              ? <Icons.PauseIconSVG />
              : <Icons.PlayIconSVG />
          }
        </div>
      )}

      <p className="track-name">{props.name}</p>

      <img src={props.album.images[1].url} alt="" />

      <p className="track-artist">{props.artists[0].name}</p>
    </div>
  )
}

export default Track