import { auth, db, doc, getDoc, onAuthStateChanged } from "../firebase/config.js";

onAuthStateChanged( auth , async (user)=> {

    if (!user) return;
        
    const snap = await getDoc(doc(db , "users" , user.uid));

    if (!snap.exists()) return;

    const profile = snap.data();

    if (profile.role === "admin") {
        window.location.href = "./admin/admin.html";
        return;
    }
    
    if (profile.role === "user" && profile.isVerified === true) {
        window.location.href = "./user/user.html";
        return;
    }

});