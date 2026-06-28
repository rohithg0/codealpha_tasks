const userId = "6a294e168fc45d7e66ef4c01";

async function loadProfile() {

    const res = await fetch(
        `http://localhost:5000/profile/${userId}`
    );

    const user = await res.json();

    document.getElementById("profile").innerHTML = `
    
        <div class="profile-card">

            <img
                src="https://i.pravatar.cc/150?img=12"
            >

            <div>

                <h2>${user.username}</h2>

                <p>${user.email}</p>

                <div class="stats">

                    <span>
                        Followers:
                        ${user.followers.length}
                    </span>

                    <span>
                        Following:
                        ${user.following.length}
                    </span>

                </div>

            </div>

        </div>

    `;
}

loadProfile();