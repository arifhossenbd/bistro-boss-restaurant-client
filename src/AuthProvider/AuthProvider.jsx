import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import Loading from '../Components/Loading/Loading';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const gitHubProvider = new GithubAuthProvider
    const axiosPublic = useAxiosPublic()
    console.log(user);
    const createUser = (name, email, password) => {
        if(setLoading(true)){
            return <Loading/>
        }
        return createUserWithEmailAndPassword(auth, name, email, password)
    }

    const signInUser = (email, password) => {
        if(setLoading(true)){
            return <Loading/>
        }
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle = () => {
        if(setLoading(true)){
            return <Loading/>
        }
        return signInWithPopup(auth, googleProvider)
    }

    const signInFacebook = () => {
        if(setLoading(true)){
            return <Loading/>
        }
        return signInWithPopup(auth, facebookProvider)
    }

    const signInGitHub = () => {
        if(setLoading(true)){
            return <Loading/>
        }
        return signInWithPopup(auth, gitHubProvider)
    }

    const updateUserProfile = (name, email, photo) => {
        if(setLoading(true)){
            return <Loading/>
        }
        return updateProfile(auth.currentUser, {
            displayName: name, email: email, photoURL: photo
        });
    }

    const logOut = () => {
        if(setLoading(true)){
            return <Loading/>
        }
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if(currentUser){
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }else{
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInGoogle,
        signInFacebook,
        signInGitHub,
        updateUserProfile,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;