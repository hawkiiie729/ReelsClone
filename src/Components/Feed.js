import React,{useContext,useEffect, useState} from 'react';
import {AuthContext} from "../Context/AuthContext"; 
import { database } from '../firebase';
import UploadFile from './UploadFile';
import Posts from './Posts';
import Navbar from './Navbar';

function Feed() {
  const {user,logout}=useContext(AuthContext);
  const [userData,setUserData]=useState('')
  // console.log(logout);
  useEffect(()=>{ 
     const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{ //jb bhi database me change hoga snap aayega
         setUserData(snapshot.data())
     })
     return ()=> {unsub()} // cleanup unsub pe jo onsnapshot lga h wo htt jyega
  },[user]) //jb user change hoga toh snapshot firse new user ka lgega
  return (
    <>
    <Navbar userData={userData}/>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}> 
      {/* <div className='comp' style={{width:'50%'}}>
          <h1>Welcome to Feed</h1>
          <button onClick={logout}>Log out</button>
         
      </div> */}
     
      <UploadFile user={userData}/>
      <Posts userData={userData}></Posts>
    </div>
    </>
  )
}

export default Feed