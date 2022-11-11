import firebase from 'firebase/compat/app';
import { useRecoilState } from "recoil";
import { authService } from "../firebase";
import 'firebase/compat/auth';
import { users } from "../states/userState";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut
} from 'firebase/auth';


export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await new signInWithRedirect(authService, provider)
    const result = await getRedirectResult(authService)
  } catch (error) {
    console.log(error)
  }
}

export const googleLogout = async () => {
  await signOut(authService);
  return
}

const email = process.env.REACT_APP_EMAIL_ID
const password = process.env.REACT_APP_EMAIL_PW

export const emailSignup = async () => {
  try {
    await createUserWithEmailAndPassword(authService, email, password)
  } catch (error) {
    console.log(error)
  }
}

export const emailSignin = async () => {
  try {
    await createUserWithEmailAndPassword(authService, email, password)
  } catch (error) {
    console.log(error)
  }

}