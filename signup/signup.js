import {
    auth, createUserWithEmailAndPassword, signInWithPopup, googleProvider,
    setDoc , doc , db , 
} from "../firebase/config.js";

const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btn = document.querySelector("#btn");
const googleBtn = document.querySelector("#googleBtn");

btn.addEventListener("click", async () => {

    const FullName = fullName.value;
    const Email = email.value;
    const Password = password.value;

    try {

        const res = await createUserWithEmailAndPassword(auth, Email, Password);

        await setDoc(doc(db , "users" , res.user.uid) , {
            email: Email,
            FullName,
            role: "user",
            isVerified: false,
            createdAt: Date.now(),
        });

        Swal.fire({
            title: "Good job!",
            text: "Signned up!",
            icon: "success"
        }).then(()=> {window.location.herf = "../login/login.html"});


    } catch (error) {
        console.log("Error: ", error.message, " error");
    }

});





googleBtn.addEventListener("click", async () => {

    try {

        const res = await signInWithPopup(auth, googleProvider);

        await setDoc(doc(db , "user" , res.user.uid) , {
            FullName: res.user.displayName || "" ,
            email: res.user.email ,
            role: "user" ,
            isVerified: false, 
            createdAt: Date.now(),  
        });

        Swal.fire({
            title: "Good job!",
            text: "Signnedup!",
            icon: "success"
        }).then(()=> {window.location.herf = "../login/login.html"});

    } catch (error) {
        console.log("Error: ", error.message, " error");
    }
});