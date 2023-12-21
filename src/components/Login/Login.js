import React, { useContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase_auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { userContext } from '../../App';

const app = initializeApp(firebaseConfig);
const Login = () => {
    const [setUserInfo]= useContext(userContext);
    const [logInUser, setLogInUser]= useState({});

    const handleGoogleAuth=()=>{
        const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    const userNameEmail= {name:user.displayName, email:user.email};
    setLogInUser(user);
    setUserInfo(userNameEmail);
    console.log(user);
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    });
    }
    

    return (
        <div>
            <h1>This is Login</h1>
            <input onClick={handleGoogleAuth} type="button" value='Login' />
            {logInUser.email && <h1>Welcome {logInUser.displayName} in Our Hotel</h1>}
        </div>
    );
};

export default Login;