import {
  initializeApp,
  
} from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDAhnMrYG9dIyqDxKSmu4kTRODcRPJus3g",
  authDomain: "tinhoctre-20508.firebaseapp.com",
  projectId: "tinhoctre-20508",
  storageBucket: "tinhoctre-20508.appspot.com",
  messagingSenderId: "465983045269",
  appId: "1:465983045269:web:f41f0f633134f7ee1d659c",
  measurementId: "G-D5SNR9DQ28",
};

const app = initializeApp(firebaseConfig, {
  experimentalForceLongPolling: true, 
  useFetchStreams: false,
});
const db = getFirestore(app);
const docRef = doc(db, "Customer", "Sensor");
const docSnap = await getDoc(docRef);
const data = docSnap.data();
console.log(data);
export { data, docRef, db };

// Initialize Firebase with your project configuration

// Get references to HTML elements

