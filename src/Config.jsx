import { initializeApp } from "firebase/app";

// API KEY
const firebaseConfig = {
  apiKey: "AIzaSyA5UY4uxPwK90xExNjA64LPv44NppnpPPc",
  authDomain: "crudtest-70a8f.firebaseapp.com",
  projectId: "crudtest-70a8f",
  storageBucket: "crudtest-70a8f.appspot.com",
  messagingSenderId: "314284033701",
  appId: "1:314284033701:web:9316ef4375f0bc524cef4c",
};

// API KEY Init
const app = initializeApp(firebaseConfig);

export default app;
