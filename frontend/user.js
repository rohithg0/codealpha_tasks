const currentUser = localStorage.getItem("userId");

async function loadUsers() {

    const res = await fetch("https://codealpha-tasks-apqo.onrender.com/users");
    const users = await res.json();

    let html = "";

    users.forEach(user => {

        // Don't show yourself
        if(user._id === currentUser) return;

        html += `
            <div class="profile-card">

                <img src="https://i.pravatar.cc/150?u=${user._id}">

                <div style="flex:1">

                    <h3>${user.username}</h3>

                    <p>${user.email}</p>

                </div>

                <button onclick="followUser('${user._id}')">
                    Follow
                </button>

            </div>
        `;

    });

    document.getElementById("usersList").innerHTML = html;

}

async function followUser(targetUserId){

    const res = await fetch(`https://codealpha-tasks-apqo.onrender.com/follow/${targetUserId}`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            userId:currentUser
        })

    });

    const data = await res.text();

    alert(data);

}

loadUsers();