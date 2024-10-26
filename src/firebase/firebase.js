import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

/**
 * Firebase configuration object containing keys and identifiers for your app.
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: "AIzaSyD_6SQvB2rAMxt7XwjFnnp-wNXkPfQ18a8",
  authDomain: "claimit-campus.firebaseapp.com",
  projectId: "claimit-campus",
  storageBucket: "claimit-campus.appspot.com",
  messagingSenderId: "18127767164",
  appId: "1:18127767164:web:72b9fb4804a2c8fc282bf9",
  measurementId: "G-D3EWGBYSDM",
};

/**
 * Initialize Firebase app with the provided configuration.
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

/**
 * Firestore database instance for the initialized app.
 * @type {Firestore}
 */
const db = getFirestore(app);

/**
 * Firebase storage instance for the initialized app.
 * @type {FirebaseStorage}
 */
const storage = getStorage(app);

/**
 * Firebase authentication instance for the initialized app.
 * @type {Auth}
 */
const auth = getAuth(app);

export { db, storage, auth };
