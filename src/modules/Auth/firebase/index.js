import { firebaseAuth, googleProvider, facebookProvider, dbUsers, dbRoles } from './config';

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

export const loginWithFacebook = async () => {
  try {
    const result = await firebaseAuth().signInWithPopup(facebookProvider);

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

const createUser = async user => {
  try {
    await dbUsers.doc(user.email).set(user);
    return user;
  } catch (error) {
    console.log('error creating user from Firebase', error);
    return null;
  }
};

export const getUserDB = async user => {
  const { email } = user;
  try {
    // look user document into database
    const userDocument = await dbUsers.doc(email).get();
    if (userDocument.exists) {
      const userFound = userDocument.data();
      const roleFound = await dbRoles.doc(email).get();

      if (roleFound.exists) {
        userFound.role = roleFound.data().role;
      } else {
        userFound.role = 'USER';
      }
      return userFound;
    }

    // save new user in case it does not exist in DB
    const newUser = await createUser(user);

    if (newUser) {
      newUser.role = 'USER';
    }
    return newUser;
  } catch (error) {
    console.log('error reading user from Firebase', error);
    return null;
  }
};

export const logoutDB = () => {
  firebaseAuth().signOut();
};
