import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL,
});

const db = firebaseApp.database();

export default db;
