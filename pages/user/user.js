import { auth, onAuthStateChanged , signOut ,
         getDoc , doc , db , 
} from "../../firebase/config.js";

import { protectPage ,  } from "../../firebase/authguard.js";

const logOutBtn = document.querySelector("#logOutBtn");





protectPage({ role: "user" , verified: true });





logOutBtn.addEventListener("click" , async()=> {
    await signOut( auth ).then(()=> {
        window.location.href = "../getIn.html";
    });
});