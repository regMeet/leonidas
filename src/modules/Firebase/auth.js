import { firebaseAuth, googleProvider } from './config';

/* eslint-disable no-unused-vars */
export const loginWithGoogle = async () => {
  try {
    const result = await firebaseAuth().signInWithPopup(googleProvider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    const { credential: accessToken, user } = result;

    // The signed-in user info.
    // console.log('accessToken', accessToken);

    const { email, displayName, photoURL } = user;
    return {
      email,
      displayName,
      photoURL,
    };
  } catch (error) {
    // Handle Errors here.
    // The email of the user's account used.
    // The firebase.auth.AuthCredential type that was used.
    const { code, message, email, credential } = error;

    console.log(
      `errorCode: ${code}; errorMessage: ${message}; email: ${email}; credential: ${credential}`,
    );
    return null;
  }
};

export const logoutDB = () => {
  firebaseAuth().signOut();
};
