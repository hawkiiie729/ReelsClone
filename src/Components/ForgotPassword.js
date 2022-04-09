import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button , CardActions } from '@mui/material';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import './Login.css';
import insta from '../Assets/Instagram.JPG';
import bg from '../Assets/insta.png'
import {Link} from 'react-router-dom';import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
import { AuthContext } from '../Context/AuthContext';
import {useNavigate,useHistory} from  'react-router-dom';


export default function ForgotPassword() {
  const store=useContext(AuthContext)
  console.log(store);
  const useStyles = makeStyles({
    text1:{
       color:'grey',
       textAlign:'center'
    },
    text2:{
      textAlign:'center'
    },
    card2:{
      height:'7vh',
      marginTop:'2%'
    }
  })
  const classes=useStyles();
  const [email,setEmail]=useState('');
  const [error,setError]=useState('');
  const [info,setInfo]=useState('');
  const [loading,setLoading]=useState(false);
  const history = useNavigate();
  const {forgotPassword} =useContext(AuthContext);

  const handleClick=async()=>{  
    try{
     setError('');
     setLoading(true)
     setInfo("An Email to reset password has been sent")
     let res=await forgotPassword(email).then(()=>{
      setLoading(false);
     history('/');

     setTimeout(()=>{
      setInfo('')
      history('/login')

     },4000) //4 sec
     }).catch(err=>{
       setError(err.message);
       setTimeout(()=>{
        setError('')
       },5000);
       setLoading(false);
     });
     
    }catch(err){
      setError(err)
      setTimeout(()=>{
        setError('')
      },2000);
      setLoading(false);
    }
  }

  return (
    <div className='loginWrapper'>
      <div className='imgcar' style={{backgroundImage:'url('+bg+')',backgroundSize:'cover'}}>
        <div className='car'>
        <CarouselProvider
            visibleSlides={1}
            totalSlides={5}
            // step={3}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}><Image src={img1}></Image></Slide>
              <Slide index={1}><Image src={img2}></Image></Slide>
              <Slide index={2}><Image src={img3}></Image></Slide>
              <Slide index={3}><Image src={img4}></Image></Slide>
              <Slide index={4}><Image src={img5}></Image></Slide>
            </Slider>
      </CarouselProvider>
        </div>

      </div>
       <div className='loginCard'>
       <Card variant='outlined'>
         <div className='insta-logo'>
           <img src={insta} alt=''/>
         </div>
              <CardContent>
                  {error!='' && <Alert severity="error">{error}</Alert>}
                  {info!='' && <Alert severity='success'>{info}</Alert>}
                  <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(e)=>setEmail(e.target.value)} />
                  
              </CardContent>
           
            <CardActions>
              <Button  color="primary" fullWidth={true} variant="contained" onClick={handleClick} loading={loading}> 
             Send Reset Email
              </Button>
            </CardActions>
          </Card>
          <Card variant='outlined' className={classes.card2} >
          <CardContent>
                  <Typography className={classes.text1} variant="subtitle1"  >
                    Don't have an Account? <Link to="/login" style={{textDecoration:'none'}}>Sign Up</Link>
                  </Typography>
              </CardContent>
          </Card>
       </div>
    </div>
    
  );
}
