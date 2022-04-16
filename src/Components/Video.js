import React from 'react'
import './Video.css'
import  ReactDOM  from 'react-dom';


function Video(props) {
  const handleClick=(e)=>{
    e.preventDefault();
    e.target.muted=!e.target.muted; //if mute h then unmute and vice versa
  }
 
 const handleScroll=(e)=>{  //ye isliye taki ek video end hone pe apne ap next wali aa jye
    let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling
    if(next){
      next.scrollIntoView()
      e.target.muted=true; //vdo mute krne k liye
    }
 }
  
  return (
   <video src={props.src} onEnded={handleScroll} className="videos-styling" muted="muted" onClick={handleClick} >

   </video>
  )
}

export default Video