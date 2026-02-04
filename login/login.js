import {
    auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, 
    db , getDoc, doc , setDoc, 
} from "../firebase/config.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btn = document.querySelector("#btn");
const googleBtn = document.querySelector("#googleBtn");





async function handleRedirect(userId) {

    const snap = await getDoc(doc(db , "users" , userId));

    if (!snap.exists()) return ;
    
    const profile = snap.data();

    if (!profile.isVerified) {
        swal.fire({
            title: "Not Verified!",
            text: "Admin has not approved yet!",
            icon: "warning",
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.steamusercontent.com/ugc/974353111661482849/4706D02264975280AEFACD65BF02F585F978B6B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
            left top / 30%
            no-repeat`,
        }).then(()=> {
            window.location.href = "../getIn.html";
        });
        return;
    };
    
    if (profile.role === "admin") {
        window.location.href = "../admin/admin.html";
    } else {
        window.location.href = "../user/user.html";
    };
    
};





btn.addEventListener("click", async () => {

    const emailVal = email.value;
    const passwordVal = password.value;

    if (!emailVal || !passwordVal) {
        Swal.fire({
            title: "Please fill the details!",
            icon: "warning",
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.steamusercontent.com/ugc/974353111661482849/4706D02264975280AEFACD65BF02F585F978B6B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
            left top / 30%
            no-repeat`,
        });
        return;
    }

    try {

        const res = await signInWithEmailAndPassword(auth, emailVal, passwordVal);

        await handleRedirect(res.user.uid);

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
        const snap = await getDoc(doc(db , "users" , res.user.uid));

        if (!snap.exists()) {
            
            await setDoc(doc(db , "users" , res.user.uid) , {
                email: res.user.email,  
                fullName: res.user.displayName || "",
                role: "user",
                isVerified: false,
                createdAt: Date.now(),
            } , {merge: true});
        }

        await handleRedirect(res.user.uid);

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