import React, { useEffect, useState } from 'react'
import '../Styles/Login.css'
import { getAuth, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import {useNavigate} from 'react-router-dom'     
const Login = ()=>{ 
    const navigate = useNavigate();
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [username, setUsername]=useState('')
    const [displayName, setDisplayName] = useState('');
    const auth = getAuth();
    // const authUser = auth.currentUser;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [photoURL, setPhotoURL] = useState('');
    const onLogin =(e)=>{
      const auth = getAuth();
      e.preventDefault();
      // const authUser = auth.currentUser;
       signInWithEmailAndPassword(auth, email, password, )
      .then((userCredential) => {
        //Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
        // updateProfile(authUser, {
        //   displayName: displayName,
        // })
        navigate('/admin')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert('User not signed in, with correct credentials')
        
      })
    }

    // get user
     

     
    // else{
    //   alert('User not logged in')
    //   return(
    //     <div className='error'>
    //       <h1>User not logged in</h1>
    //     </div>
    //   )
    // }
 
      return (
      <div className='loginMainContainer'>
        <section className='loginContainer'>
        <div className='LoginInfo'>
                <h1>Log In</h1>
                <div className='LoginInfoConetents'>
                    <form>                    
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'
                    className='LoginInput' 
                    />
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='LoginInput' 
                      id='password'/>
                    </form>
                    <button className='LoginButton'
                    type='submit'
                    onClick={onLogin}                                 
                    >Log in</button>                   
                    <div> 
                      <small>Don't have account? <a href='/register' className='sgnupin'>Sign up</a></small>                                        
                    </div>
                    
                </div>
             </div>
      </section>
        </div>
    )
      }
 
 export default Login