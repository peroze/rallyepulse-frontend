import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Style/Home.css'
import { useNavigate } from 'react-router-dom';
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import {faFacebook,faXTwitter,faInstagram,faYoutube} from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  const navigate=useNavigate();

  
  function hoverAnimation(){

    gsap.to(".face",{x:"100%",delay:0.5})
    gsap.to(".insta",{x:"-100%",delay:0.5})
    gsap.to(".youtu",{y:"100%",delay:0.5})
    gsap.to(".tweet",{y:"-100%",delay:0.5})
    gsap.to(".social",{opacity:0,delay:0.5})

    
  }

  function hoverExit(){

    gsap.to(".face",{x:"0%",delay:0.7})
    gsap.to(".insta",{x:"0%",delay:0.7})
    gsap.to(".youtu",{y:"0%",delay:0.7})
    gsap.to(".tweet",{y:"0%",delay:0.7})
    gsap.to(".social",{opacity:1,delay:0.7})

  }
  
  
  
  
  return (
    <div className='HomeContainer'>
      
      <div className='TextContainerHome'>
        <div className='welcome'><h4 >Welcome</h4><div className='top'></div><div className='bottom'></div></div>
        <div><h1>BOOK YOUR <br/> TICKET <br/> <i className='NowText' onClick={()=>{
                navigate('/contactus')}}  >NOW!</i></h1></div>
        <div className='HomeA'>
          <a><span className='Captivating'> Captivating Stories Begin with a Click.</span>
          <br/> Reserve Your Cinematic Escape Now!</a>
        </div>
        <div className='socials' onMouseEnter={()=>{hoverAnimation()}} onClick={()=>{hoverAnimation()}} onMouseLeave={()=>{hoverExit()}}>
          <div className='social' >
            <FontAwesomeIcon icon={faShareFromSquare}/></div>
          <div className='socialIcon face'> <FontAwesomeIcon icon={faFacebook} /></div>
          <div className='socialIcon tweet'><FontAwesomeIcon icon={faXTwitter}></FontAwesomeIcon></div>
          <div className='socialIcon insta'><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></div>
          <div className='socialIcon youtu'><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></div>
          </div>
      </div>
      <div className='HomeImage'>
      </div>
      <div className='socialButtons'>
  
        </div>
    </div>

  );
};

export default Home;