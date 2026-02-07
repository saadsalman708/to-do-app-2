import { protectPage } from "../../firebase/authguard.js";
import { auth, db, doc, getDoc, onAuthStateChanged, signOut } from "../../firebase/config.js";

const logOutBtn = document.querySelector("#logOutBtn");





onAuthStateChanged( auth , async(user)=> {
    const snap = await getDoc(doc(db , "users" , user.uid));
    if (!snap.exists()) return;

    const profile = snap.data();

    if (profile.role === "user" && profile.isVerified === false) {
        return;
    }

    window.location.replace("../getIn.html");
});




logOutBtn.addEventListener("click" , async()=> {
    await signOut( auth );
});