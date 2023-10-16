import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

// Assuming you have a firebaseConfig object with your Firebase project settings.
// If you don't, replace the below with your firebase configuration object.
const firebaseConfig = {
    apiKey: "AIzaSyBGLIpFsoLHyfRsqxW-f8dfUKa4bQV03NQ",
    authDomain: "skillswap-5f85d.firebaseapp.com",
    projectId: "skillswap-5f85d",
    storageBucket: "skillswap-5f85d.appspot.com",
    messagingSenderId: "689531219521",
    appId: "1:689531219521:web:09d21a680cfc62620860c0"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebase), setUser);

    // Return the unsubscribe function to ensure we stop listening when our component is unmounted.
    return () => unsubscribe();
  }, []);

  return [user];
};
