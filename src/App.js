import logo from './logo.svg';
import './App.css';
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Feed from './Components/Feed';
import {BrowserRouter,Routes ,Route } from 'react-router-dom';
import {AuthProvider} from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      
     <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            {/* <Route path='/' element={<Feed/>}/> */}
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path ='/profile/:id' element={<PrivateRoute><Profile/></PrivateRoute>}/>  
            {/* hrr user ki profile alg hogi isliye id */}
            <Route path ='/' element={<PrivateRoute><Feed/></PrivateRoute>}/> 
          </Routes>
      

     </AuthProvider>
          
    </BrowserRouter>
  );
}

export default App;
