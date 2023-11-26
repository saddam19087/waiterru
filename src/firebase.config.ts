// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCva9EGl_9hBSP-KfLoGzS0KJsFj5q2uMc",
  authDomain: "waiterru.firebaseapp.com",
  databaseURL: "https://waiterru-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "waiterru",
  storageBucket: "waiterru.appspot.com",
  messagingSenderId: "551176094063",
  appId: "1:551176094063:web:e04d9e99fadaf0c8e8289a",
  measurementId: "G-HY4QS1HPTF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
//export const analytics = getAnalytics(app)
