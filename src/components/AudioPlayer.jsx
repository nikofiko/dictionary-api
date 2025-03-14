import React, { useRef } from 'react';
import audio from '../assets/images/icon-play.svg'

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button
        onClick={playAudio}
        style={{
          padding: '10px 10px',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        <img src={audio} alt="" />
      </button>
      <audio ref={audioRef} src={audioUrl}></audio>
    </div>
  );
};

export default AudioPlayer;