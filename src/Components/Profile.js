import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { auth, database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import {AuthContext} from '../Context/AuthContext';

function Profile() {
  
  const {id}=useParams()
  const [userData,setUserdata] =useState(null)
  const [posts,setPosts]=useState(null) //if post pe koi like cmnt aaya then wo bhi update ho isliye
  useEffect(()=>{ //abhm props na leke id use krege aur useke corresponding database pe query marege
     database.users.doc(id).onSnapshot((snap)=>{
       console.log(snap.data());
       setUserdata(snap.data())
     })
  },[id])
  // console.log(userData);
  useEffect(()=>{
    const fetchData=async()=>{
      if(userData!=null){
        let parr=[];
        console.log(posts);
         for(let i=0;i<userData.postIds.length;i++){ //hme uske saare post dikhane h
           let postData= await database.posts.doc(userData.postIds[i]).get()
          //  console.log(postData);
           parr.push({...postData.data(),postId:postData.id})
         }
         console.log(parr);
         setPosts(parr)
         console.log(posts);
    }
    }
    fetchData();
  },[userData])
  return (
   <>
   { 
    
     posts==null ||  userData==null ? <div><CircularProgress color='secondary'/></div>:
      <>
      <Navbar userData={userData}/>
      <div className='spacer'></div>
      <div className='container'>
        <div className='upper-part'>
      <div className='profile-img'>
         <img src={userData.profileUrl}></img>
      </div>
     <div className='info'>
          <Typography variant='h5'>
            Email :{userData.email}
          </Typography>
          <Typography variant='h6'>
            Posts :{userData.postIds.length}
          </Typography>
      </div>
        </div>
        <hr></hr>
        <div className='profile-videos'>

        </div>
      </div>
      </>
   }
   </>
  )
}


export default Profile