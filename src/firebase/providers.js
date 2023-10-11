import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try{
        const result = await signInWithPopup(FirebaseAuth,googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
       const {displayName,email,photoURL,phoneNumber,uid} = result.user;
       
       return {
        ok: true,
        displayName,email,photoURL,phoneNumber,uid
       }
       //console.log({user});
    }catch(error){
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}
export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}