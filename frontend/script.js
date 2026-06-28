const userId = "6a294e168fc45d7e66ef4c01";

async function createPost() {
    const content = document.getElementById("postContent").value;

    await fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            content
        })
    });

    loadPosts();
}

async function likePost(postId) {
    await fetch(`http://localhost:5000/like/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId
        })
    });

    loadPosts();
}

async function loadPosts() {

    const res = await fetch("http://localhost:5000/posts");
    const posts = await res.json();

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

            <button
                class="like-btn"
                onclick="likePost('${post._id}')"
            >
                Like
            </button>

            <div class="comment-section">

                <input
                    type="text"
                    id="comment-${post._id}"
                    placeholder="Write a comment..."
                >

                <button
                    onclick="addComment('${post._id}')"
                >
                    Comment
                </button>

            </div>

        </div>
        `;
    });

    document.getElementById("posts").innerHTML = html;
}
async function addComment(postId) {

    const text = document.getElementById(
        `comment-${postId}`
    ).value;

    await fetch("http://localhost:5000/comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            postId,
            userId,
            text
        })
    });

    loadPosts();
}
loadPosts();