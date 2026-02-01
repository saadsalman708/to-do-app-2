import {
    auth, signInWithEmailAndPassword, signInWithPopup, googleProvider,

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

        const res = await signInWithEmailAndPassword(auth, Email, Password);

        Swal.fire({
            title: "Good job!",
            text: "Logged in!",
            icon: "success",
            width: 600,
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.steamusercontent.com/ugc/974353111661482849/4706D02264975280AEFACD65BF02F585F978B6B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
            left top
            no-repeat`
        });

    } catch (error) {
        console.log("Error: ", error.message, " error");
    }

});





googleBtn.addEventListener("click", async () => {
    try {

        const res = await signInWithPopup(auth, googleProvider);

        Swal.fire({
            title: "Good job!",
            text: "Logged in!",
            icon: "success"
        });

    } catch (error) {
        console.log("Error: ", error.message, " error");
    }
});