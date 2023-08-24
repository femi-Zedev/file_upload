import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGINGSENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID!
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const storage = getStorage();

export { app, storage };