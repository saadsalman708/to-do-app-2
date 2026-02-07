import { auth, onAuthStateChanged, getDoc, doc, db, } from "./config.js";





export function protectPage({ requiredAuth = true , role , verified , onSuccess }) {

    onAuthStateChanged( auth , async (user)=> {
        
        if (requiredAuth && !user) {
            window.location.replace("../getIn.html");
            return;
        }
        
        if (!user) return;
        
        const snap = await getDoc(doc(db , "users" , user.uid));
        
        if (!snap.exists()) {
            window.location.replace("../getIn.html");
        };  
        
        const profile = snap.data();
        
        if (role && profile.role !== role) {
            window.location.replace("../getIn.html");
            return;
        }
        
        if (verified && profile.isVerified !== verified) {
            window.location.replace("../getIn.html");
            return;
        }

        if (typeof onSuccess === "function") {
            onSuccess();
        }
    });    
}