import { auth, onAuthStateChanged , signOut ,
         getDoc , doc , db , 
} from "../../firebase/config.js";

import { protectPage ,  } from "../../firebase/authguard.js";

const logOutBtn = document.querySelector("#logOutBtn");
const txt = document.querySelector("#txt");
const file = document.querySelector("#file");
const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");





protectPage({ role: "user" , verified: true , onSuccess });





logOutBtn.addEventListener("click" , async()=> {
    await signOut( auth );
});





function name(params) {
    
}





function onSuccess() {
    console.log("OK");
}