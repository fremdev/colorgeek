import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
});

export const db = firebaseApp.database();

export default firebase;
