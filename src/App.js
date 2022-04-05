import logo from './logo.svg';
import './App.css';
import Signup from "./Components/Signup";
import Login from "./Components/Login"
import {BrowserRouter,Routes ,Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
   
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            {/* <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path ='/' element={<PrivateRoute><Feed/></PrivateRoute>}/> */}
          </Routes>
      
    </BrowserRouter>
  );
}

export default App;
