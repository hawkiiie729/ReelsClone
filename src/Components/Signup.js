import * as React from 'react';
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button , CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import './Signup.css';
import insta from '../Assets/Instagram.JPG';
import {Link,useNavigate,useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database,storage } from '../firebase';



export default function Signup() {
  const useStyles = makeStyles({
    text1:{
       color:'grey',
       textAlign:'center'
    },
    card2:{
      height:'7vh',
      marginTop:'2%'
    }
  })
  const classes=useStyles();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const [file,setFile]=useState(null);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const history = useNavigate();
  const {signup}=useContext(AuthContext);

  const handleClick=async()=>{
     if(file==null){
      //  console.log('file is null');
       setError("Please upload profile image first");
       setTimeout(()=>{ //hmesa error ni dikhani h isliye
         setError('') 
       },2000) //2 sec baad hta lena hai
       return;
     }
     try{ //sign up ki request lgane k liye
          
        setError('')
        setLoading(true)
        let userObj=await signup(email,password)
      
        let uid=userObj.user.uid
        const uploadTask=storage.ref('/users/${uid/ProfileImage}').put(file); //task define kiya 
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
         database.users.doc(uid).set({
           email:email,
           userId:uid,
           fullname:name,
           profileUrl:url,
           createAt:database.getTimeStamp()
         })
       })
       setLoading(false);
       history('/')
     }
        console.log(uid);
     }catch(err){
      setError(err);
      setTimeout(()=>{ //hmesa error ni dikhani h isliye
        setError('') 
      },2000) //2 sec baad hta lena hai
     
     }
  }

  return (
    <div className='signupWrapper'> 
       <div className='signupCard'>
       <Card variant='outlined'>
         <div className='insta-logo'>
           <img src={insta} alt=''/>
         </div>
              <CardContent>
                  <Typography className={classes.text1} variant="subtitle1" >
                     Sign up see photos and videos from your friends
                  </Typography>
                  {error!='' && <Alert severity="error">{error}</Alert>}  
                  <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size='small' value={password} onChange={(e)=>setPassword(e.target.value)} />
                  <TextField id="outlined-basic" label="Full name" variant="outlined" fullWidth={true} margin="dense" size='small' value={name} onChange={(e)=>setName(e.target.value)} />
                  <Button size="small" color="secondary" fullWidth={true} variant="outlined" margin="dense" component="label">
                Upload Profile Image
                <input type='file' accept='image/*' hidden onChange={(e)=>setFile(e.target.files[0])}></input>
              </Button>
              </CardContent>
           
            <CardActions>
              <Button  color="primary" fullWidth={true} variant="contained" loading={loading} onClick={handleClick}>
                Sign Up
              </Button>
            </CardActions>
            <CardContent>
                  <Typography className={classes.text1} variant="subtitle1" >
                     By signing up,you agree to our terms,Conditions and Cookies policy.
                  </Typography>
              </CardContent>
          </Card>
          <Card variant='outlined' className={classes.card2}>
          <CardContent>
                  <Typography className={classes.text1} variant="subtitle1" >
                    Having an Account? <Link to="/login" style={{textDecoration:'none'}}>LogIn</Link>
                  </Typography>
              </CardContent>
          </Card>
       </div>
    </div>
    
  );
}
