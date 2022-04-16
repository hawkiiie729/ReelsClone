import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';

function Like({userData,postData}) {
  const [like,setLike]=useState(null);
  useEffect(()=>{
 let check=postData.likes.includes(userData.userId)?true:false
 setLike(check);
  },[postData])

 const handleLike=()=>{
   if(like==true){
   let narr=postData.likes.filter((el)=>el!=userData.userId) //jo abhi wala user hai uski id hta do likes wale arr me se
   database.posts.doc(postData.postId).update({
     likes:narr
   })
   }
   else{
    let narr= [...postData.likes,userData.userId] //likes wale array me current user ki id add kr do,database update kiya
    database.posts.doc(postData.postId).update({
      likes:narr
    })
   }
 } 

  return (
    <div>
       {
         like!=null?
         <>
         {
           like==true?<FavoriteIcon className={'icon-styling like'} onClick={handleLike}/>: <FavoriteIcon className={'icon-styling unlike'}  onClick={handleLike}/>
         }
         </>:
         <></> //if lke null then kch bhi ni return krna
       }
    </div>
  )
}

export default Like