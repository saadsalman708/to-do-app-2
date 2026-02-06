import { auth, onAuthStateChanged, getDoc, doc, db, } from "./config.js";





export  function protectPage({ requiredAuth = true , role , verified }) {

    onAuthStateChanged( auth , async (user)=> {        

        if (requiredAuth && !user) {
            window.location.href = "../getIn.html";
            return;
        }
        
        if (!user) return;

        const snap = await getDoc(doc(db , "users" , user.uid));
        
        if (!snap.exists()) {
            window.location.href = "../getIn.html";
        };  

        const profile = snap.data();
        
        if (role && profile.role !== role) {
            window.location.href = "../getIn.html";
            return;
        }

        if (verified && profile.isVerified !== verified) {
            window.location.href = "../getIn.html";
            return;
        }

    });
}