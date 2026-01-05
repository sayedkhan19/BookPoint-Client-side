import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

  const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setloading] = useState(true);

    const createUser = (email,password) =>{
        setloading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email,password) =>{
        setloading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            console.log("user in the auth",currentUser)
            setloading(false);
        });
        return ()=>{
            unSubscribe();
        }
    },[]);
    
  
    const googleLogin = ()=>{
        setloading(true);
        return signInWithPopup(auth,googleProvider)
    }


    const logOut = ()=>{
        setloading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        setUser,
        createUser,
        signIn,
        loading,
        setloading,
        logOut,
        googleLogin,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;