import map from 'lodash/fp/map';
import { dbUsers, dbRoles } from './config';

export const createUserDB = async user => {
  try {
    await dbUsers.doc(user.email).set(user);
    return user;
  } catch (error) {
    console.log('error creating user from Firebase', error);
    return null;
  }
};

export const getUserDB = async email => {
  let userFound = null;
  try {
    // look user document into database
    const userDocument = await dbUsers.doc(email).get();
    if (userDocument.exists) {
      userFound = userDocument.data();
    }
  } catch (error) {
    console.log('error reading user from Firebase', error);
  }
  return userFound;
};

export const getUsersDB = async () => {
  let users = null;
  try {
    // look user document into database
    const usersDocument = await dbUsers.get();
    users = map(userDoc => userDoc.data())(usersDocument.docs);
  } catch (error) {
    console.log('error reading user from Firebase', error);
  }
  return users;
};

export const getRoleDB = async email => {
  let roleFound = 'USER';

  try {
    const roleDocument = await dbRoles.doc(email).get();
    if (roleDocument.exists) {
      roleFound = roleDocument.data().role;
    }
  } catch (error) {
    console.log('error reading role from Firebase', error);
  }

  return roleFound;
};
