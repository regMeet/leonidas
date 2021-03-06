import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebaseApp.initializeApp(config);

// Authentication
export const firebaseAuth = firebaseApp.auth;
export const googleProvider = new firebaseApp.auth.GoogleAuthProvider();

// Database
const db = firebaseApp.firestore();
const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);
export const currentTimestamp = firebaseApp.firestore.FieldValue.serverTimestamp;
export const dbUsers = db.collection('users');
export const dbRoles = db.collection('roles');
export const dbMachineData = db.collection('machineData');
export const dbTemperatureData = db.collection('temperatureData');
