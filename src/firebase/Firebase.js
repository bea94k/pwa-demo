import firebase from 'firebase/app';
//import 'firebase/storage';     // for storage
//import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore

import config from '../config.json';

try {
    console.log('Initializing Firebase...');
    // Initialize Firebase
    firebase.initializeApp(config.FIREBASE_CONFIG);
} catch (err) {
    console.log('Error initializing Firebase: ', err)
}

export default firebase;