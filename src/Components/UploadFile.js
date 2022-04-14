import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
// import MovieIcon from '@material-ui/icons/Movie';
// import { SvgIcon } from '@mui/material';
// import MovieIcon from '@mui/icons-material/MovieIcon';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid'
import { database,storage } from '../firebase';


function UploadFile(props) {
  console.log(props.user);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

const handleChange=async(file)=>{
  if(file==null){
    setError("Please select a file first");
    setTimeout(()=>{
      setError('');

    },2000)
    return;
  }
  if(file.size/(1024*1024)>100){
    setError("This video is Very Large in Size");
    setTimeout(()=>{
      setError('')
    },2000)
    return;
  }
  let uid=uuidv4();
  setLoading(true);
  const uploadTask=storage.ref('/posts/${uid/$(file.name)}').put(file); //task define kiya 
     uploadTask.on('state_changed',fn1,fn2,fn3);
     function fn1(snapshot){ //snapshot btyega ki kitna kaam ho chuka hai
       let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
       console.log('Upload is ${progress} done')
     }
     function fn2(error){
      setError(error);
      setTimeout(()=>{ //hmesa error ni dikhani h isliye
        setError('') 
      },2000) //2 sec baad hta lena hai
      setLoading(false)
      return;
       
     }
     function fn3(){
       uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
         console.log(url);
        let obj={
          likes:[],
          comments:[],
          pId:uid,
          pUrl:url,
          uName:props.user.fullname,
          uProfile:props.user.profileUrl, // user avatar k liye
          userId:props.user.userId,
          createdAt:database.getTimeStamp() // isse upload hone wala time a jyega

        }
        //AB OBJECT ko save krna hai
        database.posts.add(obj).then(async(ref)=>{
          let res=await database.users.doc(props.user.userId).update({
            postIds :props.user.postIds!=null ? [...props.user.postIds,ref.id]: [ref.id]
          })
        }).then(()=>{
          setLoading(false)
        }).catch((err)=>{
         setError(err)
         setTimeout(()=>{
           setError('')
         },2000)
         setLoading(false)
        })
       })
      //  setLoading(false);
      
     }
}


  return (
    <div>
      {
        error!=''?<Alert severity="error">{error}</Alert>: //agr error not empty string then alert dikhao 
        <>
           <input type='file' accept='video/' onChange={(e)=>handleChange(e.target.files[0])} id='upload-input' style={{display:'none'}}></input>
           <label htmlFor='upload-input'>
               <Button
                 variant='outlined' 
                 color='secondary'
                 component="span"// ab ye button input ki trh kaam krne lga
                 loading={loading}
                
               >
             {/* <MovieIcon/> */}
               Upload Video
               </Button>
           </label>
          {loading && <LinearProgress color="secondary" style={{marginTop:'3%'}}/>}
        </>
      }
    </div>
  )
}

export default UploadFile