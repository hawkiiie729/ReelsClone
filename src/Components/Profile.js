import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { auth, database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import {AuthContext} from '../Context/AuthContext';
import './Profile.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';  
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';
import Posts from './Posts';


function Profile() {
  const {user} =  useContext(AuthContext)
  console.log(user);
  const {id}=useParams()
  console.log(id);
  const [userData,setUserdata] =useState(null)
  const [currentUser,setCurrentUser] = useState(null)
  const [posts,setPosts]=useState(null) //if post pe koi like cmnt aaya then wo bhi update ho isliye
  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
  
  useEffect(()=>{ //abhm props na leke id use krege aur useke corresponding database pe query marege
    //  database.users.doc(id).onSnapshot((snap)=>{
    //    console.log(snap.data());
    //    setUserdata(snap.data())
    const setcurr=async()=>{
      database.users.doc(id).onSnapshot((snap) => {
        setUserdata(snap.data())
    })
    let a = await database.users.doc(user.uid).get()
    setCurrentUser(a.data())
    }
    setcurr();
  },[id])
  // console.log(userData);
  useEffect(()=>{
    const fetchData=async()=>{
      
      if (userData != null) {
        let parr = []
        if (userData.postIds != undefined) {
            for (let i = 0; i < userData.postIds.length; i++) {
                let postData = await database.posts.doc(userData.postIds[i]).get()
                console.log(postData.data());
                console.log(parr);  
                parr.push({...postData.data(),postId:postData.id})
            }
        }
        console.log(parr);
        setPosts(parr)
    }
    }
    fetchData();
   // console.log(posts);
  },[userData,posts])
  
  return (
   <>
   { 
    
     posts==null ||  userData==null ? <div><CircularProgress color='secondary'/></div>:
      <>
      {console.log(posts)}
      <Navbar userData={currentUser}/>
      <div className='spacer'></div>
      <div className='container'>
        <div className='upper-part'>
      <div className='profile-img'>
         <img src={userData.profileUrl}></img>
      </div>
     <div className='info'>
          <Typography variant='h5'>
            Name :{userData.fullname}
          </Typography>
          <Typography variant='h6'>
            Posts :{userData.postIds !=undefined ? userData.postIds.length :'0'}
          </Typography>
      </div>
        </div>
        <hr style={{marginTop:'3rem',marginBottom:'3rem'}}></hr>

        <div className='profile-video'>
          {
            posts.length==0? "No post to show":
           posts.map((post,index)=>(
            <React.Fragment key={index} >
              {console.log(post)}
              <div className='videos'>
                  <video  muted='muted' onClick={()=>handleClickOpen(post.pId)} >
                      <source src={post.pUrl}/>
                  </video>
                
                          <Dialog
                                open={open==post.pId}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth={true}
                                maxWidth='md'
                              >
                                <div className='modal-container'>
                                  <div className='video-modal'>
                                   <video autoPlay={true} muted='muted' controls>
                                     <source src={post.pUrl}/>
                                   </video>
                                  </div>
                                  <div className='comment-modal'>
                                  <Card className='card1' style={{padding:'1rem'}}>
                                     <Comments postData={post}/>
                                    </Card>
                                    <Card variant='outlined' className='card2'>
                                     <Typography style={{padding:'0.4rem'}}>
                                       {post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}
                                       </Typography>
                                     <div style={{display:'flex'}} >
                                       <Like2 postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}></Like2>
                                       <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} postData={post} userData={userData}/>
                                     </div>
                                    </Card>
                             </div>

                            </div>
                </Dialog>
              </div>
            </React.Fragment> 

         ))

          }

        
        </div>
      </div>
      </>
   }
   </>
  )
}


export default Profile




