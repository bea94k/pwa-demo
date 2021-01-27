import firebase from 'firebase/app';
import 'firebase/storage';     // for storage
//import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore

import config from '../config.json';

console.log('Initializing Firebase...');
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config.FIREBASE_CONFIG);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export {db, storage};