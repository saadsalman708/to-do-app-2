  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword,
           GoogleAuthProvider , signInWithPopup , 
   } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
  import { getFirestore , doc , setDoc , addDoc , getDoc , collection , 
           
  } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCKTFOWTxnVz2j89fiWKKhJ2MVhyngRu7g",
    authDomain: "to-do-app-1-2b375.firebaseapp.com",
    databaseURL: "https://to-do-app-1-2b375-default-rtdb.firebaseio.com",
    projectId: "to-do-app-1-2b375",
    storageBucket: "to-do-app-1-2b375.firebasestorage.app",
    messagingSenderId: "1012312873703",
    appId: "1:1012312873703:web:f44941aec389d4b0086042"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();


export { auth , db , googleProvider , 
    createUserWithEmailAndPassword , signInWithEmailAndPassword , 
    signInWithPopup , 
    setDoc , doc , collection , getDoc , 
 };