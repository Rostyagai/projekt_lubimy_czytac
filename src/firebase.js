import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhkHUMAHiTiwh3aiw1N5FRcMqv0UgUjiw",
  authDomain: "vistula-lubi-czytac.firebaseapp.com",
  projectId: "vistula-lubi-czytac",
  storageBucket: "vistula-lubi-czytac.firebasestorage.app",
  messagingSenderId: "976521717868",
  appId: "1:976521717868:web:dc1128d2ff6e7ec0485049",
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
