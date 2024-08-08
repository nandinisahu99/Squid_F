import React from 'react';
import vid16_9 from '../assets/Start.mp4';
import vid4_3 from "../assets/SQ start.mp4";

export default function start({setIntro, setLoginRegister, ratio}) {

  const startIntro=()=>{
    setIntro(false);
    setLoginRegister(true);
  }
  return (
    <>
    <div className="video-body">
    <button className="start_btn btn" onClick={startIntro}>Start</button>
    <video width="100%" height="100%" autoPlay loop muted>
        <source src={ratio>=1.6?vid16_9:vid4_3} type='video/mp4' />
    </video>
    </div>
    </>
  )
}