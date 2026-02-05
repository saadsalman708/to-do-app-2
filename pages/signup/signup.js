import {
    auth, createUserWithEmailAndPassword, signInWithPopup, googleProvider,
    setDoc, doc, db, getDoc,
} from "../../firebase/config.js";

import { protectPage } from "../../firebase/authguard.js";

const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btn = document.querySelector("#btn");
const googleBtn = document.querySelector("#googleBtn");





protectPage({ requiredAuth: false });





async function handleRedirect(uid , isNew) {

    const snap = await getDoc(doc(db , "users" , uid));    

    if (!snap.exists()) return;
    const profile = snap.data();

    let pageRedirect = "../Login/login.html";
    let titleMsg = "Account Created!";
    let textMsg = "Wait for admin aproval!";
    let iconMsg = "success";


    if (!profile.isVerified) {
        textMsg = "Admin haven't Aprove yet! Wait for admin aproval";
        iconMsg = "warning";
    } else {
        textMsg = "Welcome User";
        pageRedirect = "../user/user.html";
    }
    
    if (isNew === false) {
        titleMsg = "Account already exists";
        pageRedirect = "../getIn.html";
    }

    if (profile.role === "admin") {
        titleMsg = "Login Successful";
        textMsg = "Welcome Admin";
        pageRedirect = "../admin/admin.html";
    }

    Swal.fire({
        title: titleMsg,
        text: textMsg,
        icon: iconMsg,
        backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.steamusercontent.com/ugc/974353111661482849/4706D02264975280AEFACD65BF02F585F978B6B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
            left top / 30%
            no-repeat`,
    }).then(() => {
        window.location.href = pageRedirect;
    });
}





btn.addEventListener("click", async () => {

    const FullName = fullName.value;
    const emailVal = email.value;
    const passwordVal = password.value;

    try {

        const res = await createUserWithEmailAndPassword(auth, emailVal, passwordVal);

        await setDoc(doc(db, "users", res.user.uid), {
            email: emailVal,
            FullName,
            password: passwordVal,
            role: "user",
            isVerified: false,
            createdAt: Date.now(),
        });

        Swal.fire({
            title: "Account Created!",
            text: "Wait for admin aproval to login!",
            icon: "success",
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.steamusercontent.com/ugc/974353111661482849/4706D02264975280AEFACD65BF02F585F978B6B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
            left top / 30%
            no-repeat`,
        }).then(() => {
            window.location.href = "../login/login.html";
        });


    } catch (error) {
        Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "warning",
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.steamusercontent.com/ugc/974353111661482849/4706D02264975280AEFACD65BF02F585F978B6B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
            left top / 30%
            no-repeat`,
        });
    }

});





googleBtn.addEventListener("click", async () => {

    try {

        const res = await signInWithPopup(auth, googleProvider);
        const snap = await getDoc(doc(db, "users", res.user.uid));
        let isNew = false;

        if (!snap.exists()) {

            await setDoc(doc(db, "users", res.user.uid), {
                FullName: res.user.displayName || "",
                email: res.user.email,
                role: "user",
                isVerified: false,
                createdAt: Date.now(),
            });

            isNew = true;
        }

        await handleRedirect(res.user.uid , isNew);

    } catch (error) {
        Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "warning",
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.steamusercontent.com/ugc/974353111661482849/4706D02264975280AEFACD65BF02F585F978B6B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
            left top / 30%
            no-repeat`,
        });
    }
});