import * as React from 'react';
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
import {Link} from 'react-router-dom';



export default function Signup() {
  const useStyles = makeStyles({
    text1:{
       color:'grey',
       textAlign:'center'
    },
    card2:{
      height:'5vh',
      marginTop:'2%'
    }
  })
  const classes=useStyles();
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
                  {true && <Alert severity="error">This is an error alert — check it out!</Alert>}
                  <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' />
                  <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size='small' />
                  <TextField id="outlined-basic" label="Full name" variant="outlined" fullWidth={true} margin="dense" size='small' />
                  <Button size="small" color="secondary" fullWidth={true} variant="outlined" margin="dense" component="label">
                Upload Profile Image
                <input type='file' accept='image/*' hidden></input>
              </Button>
              </CardContent>
           
            <CardActions>
              <Button  color="primary" fullWidth={true} variant="contained">
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
