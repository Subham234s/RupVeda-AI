import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile,
  User
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { HistoryItem, Prompt } from "../types";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn7j5Nm5DoRg_9rVY4xf4rMVFSHHILk8c",
  authDomain: "editspark-7256e.firebaseapp.com",
  projectId: "editspark-7256e",
  storageBucket: "editspark-7256e.appspot.com",
  messagingSenderId: "982548270696",
  appId: "1:982548270696:web:53a94ee1dbf8c89f8ef5dd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// --- Firestore Data Management ---

interface UserData {
  history?: HistoryItem[];
  communityPrompts?: Prompt[];
}

export const getUserData = async (uid: string): Promise<UserData> => {
  const userDocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserData;
  }
  return { history: [], communityPrompts: [] };
};

export const updateUserData = async (uid: string, data: UserData) => {
  const userDocRef = doc(db, 'users', uid);
  await setDoc(userDocRef, data, { merge: true });
};


export { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile,
};
export type { User };