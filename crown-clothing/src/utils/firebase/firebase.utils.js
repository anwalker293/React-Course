import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-BLKf4JXmq8exxgmBhBLWtdsPfq8QNFQ",
  authDomain: "crwn-clothing-db-df2c0.firebaseapp.com",
  projectId: "crwn-clothing-db-df2c0",
  storageBucket: "crwn-clothing-db-df2c0.appspot.com",
  messagingSenderId: "896912007160",
  appId: "1:896912007160:web:3467a0ab64793c42e6800d",
  measurementId: "G-8BCPV4JRMK",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = { displayName: "basic" }
) => {
  if (!userAuth) return;
  // See if existing document reference
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  // Check if user data exists
  // if user data exists
  // return userDocRef
  // if user data does not exist
  //
  // create/set doc with data from userAuth in collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating the user.");
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
