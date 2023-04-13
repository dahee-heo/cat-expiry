import { authService } from "../firebase";
import 'firebase/compat/auth';
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut
} from 'firebase/auth';


export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await new signInWithRedirect(authService, provider)
    await getRedirectResult(authService)

  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  await signOut(authService);
  return
}

const email = process.env.REACT_APP_EMAIL_ID
const password = process.env.REACT_APP_EMAIL_PW


export const emailSignin = async () => {
  try {
    await createUserWithEmailAndPassword(authService, email, password)
  } catch (error) {
    console.log(error)
  }
}

export const guestLogin = async () => {
  try {
    await signInWithEmailAndPassword(authService, `${process.env.REACT_APP_EMAIL_ID}`, `${process.env.REACT_APP_EMAIL_PW}`)
  } catch (error) {
    console.log(error)
  }
}