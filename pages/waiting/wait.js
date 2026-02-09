// import { protectPage } from "../../firebase/authguard.js";
import { auth, db, doc, getDoc, onAuthStateChanged, signOut, updateDoc } from "../../firebase/config.js";

const logOutBtn = document.querySelector("#logOutBtn");
const begBtn = document.querySelector("#begBtn");

let uid = null;



const checkAuth = onAuthStateChanged( auth , async(user)=> {

    const snap = await getDoc(doc(db , "users" , user.uid));
    if (!snap.exists()) return;

    const profile = snap.data();

    if (profile.role === "user" && profile.isVerified === false) {
        return;
    }

    window.location.replace("../getIn.html");
    return;
});





logOutBtn.addEventListener("click" , async()=> {
    await signOut( auth );
});





begBtn.addEventListener("click" , async()=> {

    if (!auth) return;
    
    const uid = await auth.currentUser.uid;
    
    if (!uid) return;
    
    // await updateDoc(doc(db , "users" , uid) , {
    //     isVerified: true,
    // });

        swal.fire({
        title: "Begging for Verify",
        text: "Waiting to get Verify!",
        icon: "warning",
        backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.steamusercontent.com/ugc/974353111661482849/4706D02264975280AEFACD65BF02F585F978B6B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
            left top / 30%
            no-repeat`,
    }).then(() => {
        // window.location.href = "../getIn.html";
    });
    
});