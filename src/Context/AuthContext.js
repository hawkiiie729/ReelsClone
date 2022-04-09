import React,{useState,useEffect} from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth"
export const AuthContext=React.createContext(); //store bna ke export kraya



export function AuthProvider({children}){ //iske andr hme jo jo state aur func chiye wo define krege
    const [user,Setuser]=useState();
    const [loading,SetLoading]=useState(true);
    //now statechanging functions
  
    function signup(email,password){
      return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email,password){
      return auth.signInWithEmailAndPassword(email,password);
    }
    
    function logout(){
      return auth.signOut();
    }

    function forgotPassword(email){
      return auth.sendPasswordResetEmail(email)
  }

    useEffect(() => {  //componentdidmount wala
      const unsub=auth.onAuthStateChanged((user)=>{
          Setuser(user);
          SetLoading(false);
      })  
    
      return ()=>{ //ye componetdidUnmount k time chlne wala hai
        unsub();
      }
     
    },[])

    const store={
      user,
      signup,
      login,
      logout,
      forgotPassword
    }
    return(
      <AuthContext.Provider value={store}>
        {!loading && children}
      </AuthContext.Provider>
    )
}
