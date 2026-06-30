const userId = localStorage.getItem("userId");

async function loadProfile() {

    const res = await fetch(`https://codealpha-tasks-apqo.onrender.com/profile/${userId}`);
    const user = await res.json();

    document.getElementById("username").innerText = user.username;
    document.getElementById("email").innerText = user.email;

    document.getElementById("followersCount").innerText =
        user.followers ? user.followers.length : 0;

    document.getElementById("followingCount").innerText =
        user.following ? user.following.length : 0;

}

async function loadMyPosts() {

    const res = await fetch(`https://codealpha-tasks-apqo.onrender.com/userposts/${userId}`);
    const posts = await res.json();

    document.getElementById("postsCount").innerText = posts.length;

    let html = "";

    posts.forEach(post => {

        html += `
        <div class="post">

            <div class="username">
                👤 ${post.userId.username}
            </div>

            <div class="content">
                ${post.content}
            </div>

            <div class="post-image">
                <img src="https://picsum.photos/600/300?random=${post._id}">
            </div>

            <div class="likes">
                ❤️ ${post.likes.length} Likes
            </div>

        </div>
        `;

    });

    document.getElementById("myPosts").innerHTML = html;

}

loadProfile();
loadMyPosts();