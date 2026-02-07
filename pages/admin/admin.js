import { auth, onAuthStateChanged , signOut , 
         getDocs , doc , db , updateDoc, 
         collection,
 } from "../../firebase/config.js";
import { protectPage ,  } from "../../firebase/authguard.js";

const logOutBtn = document.querySelector("#logOutBtn");
const usersDiv = document.querySelector("#usersDiv");





protectPage({ role: "admin" , verified: false , onSuccess });





logOutBtn.addEventListener("click" , async()=> {
    await signOut( auth );
});





const getUsers = async()=> {
    
    const querySnapshot = await getDocs(collection( db , "users" ));

    const list = [];

    querySnapshot.forEach(userData => {
        const data = userData.data();
        
        if (data.role === "admin") return;

        list.push({
            uid: userData.id,
            fullName: data.fullName || data.FullName,
            email: data.email,
            password: data.password || "🤫",
            isVerified: data.isVerified,
            role: data.role,
            createdAt: data.createdAt,
        });
    });
        
    return list;

}





const loadUsers = async()=> {

    usersDiv.innerHTML = ``;
    const usersData = await getUsers();    
    const ul = document.createElement("ul");

    usersData.forEach((user)=>{
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = user.isVerified ? "Unverify" : "Verify";
        // btn.setAttribute('onclick' , "verUser()");
        btn.onclick = ()=> verUser(user.uid , user.isVerified);
        li.innerHTML = `
            <div>uid: ${user.uid}</div>
            <div>Full Name: ${user.fullName}</div>
            <div>Email: ${user.email}</div>
            <div>Password: ${user.password}</div>
            <div>Role: ${user.role}</div>
            <div>Verify: ${user.isVerified}</div>
            <div>Joinned at: ${user.createdAt}</div>
        `;

        li.appendChild(btn);
        ul.appendChild(li);
    });
    usersDiv.appendChild(ul);
}





const verUser = async (uid , verify)=> {
    await updateDoc(doc( db , "users" , uid) , {
        isVerified : !verify
    });
    loadUsers();
}


function onSuccess() {
    loadUsers()
}