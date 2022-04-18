
import React, {useState,useEffect} from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';

function Posts({userData}) {
  const [posts,setPosts]=useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
   useEffect(()=>{
     let parr=[]
     const unsub=database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
       parr=[]
       querySnapshot.forEach((doc)=>{  //hr snapshot me ek object hoga
        let data={...doc.data(),postId:doc.id}
        parr.push(data)
       })
       setPosts(parr)
     })
     return unsub //isse clean ho jyega
   },[])
  return (
    <div>
      {
        posts==null || userData==null ? <CircularProgress color="secondary" /> :
        <div className='video-container'>
          {
           posts.map((post,index)=>(
            <React.Fragment key={index} >
              <div className='videos'>
                 <Video src={post.pUrl}/>
                 <div className='fa' style={{display:'flex'}}>
                 <Avatar src={userData.profileUrl} />
                 <h4>{userData.fullname}</h4>
                 </div>
                 <Like userData={userData} postData={post}/>
                 <ChatBubbleIcon className='chat-styling' onClick={()=>handleClickOpen(post.pId)}/>
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
                                     <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
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

      }
    </div>
  )
}

export default Posts