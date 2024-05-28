document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault()
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value

    fetch('post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, content: content, username: username }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                loadPosts()
            } else {
                alert(data.message)
            }
        })
})

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('like-button')) {
        handleReaction(e.target.closest('.post').getAttribute('data-postid'), 'like')
    } else if (e.target.classList.contains('dislike-button')) {
        handleReaction(e.target.closest('.post').getAttribute('data-postid'), 'dislike')
    }
})

function loadComments(postID) {
    const commentsContainer = document.querySelector(`.commentsContainer[data-postid="${postID}"]`)
    fetch('comments.php?postID=' + postID)
        .then((response) => response.json())
        .then((data) => {
            commentsContainer.innerHTML = ''
            data.comments.forEach((comment) => {
                const commentDiv = document.createElement('div')
                commentDiv.className = 'comment'
                commentDiv.innerHTML = `
                <p>${comment.CommentContent}</p>
                <small>Comment by: ${comment.Username} on ${comment.Timestamp}</small>
            `
                commentsContainer.appendChild(commentDiv)
            })
        })
    const commentForm = document.querySelector(`.commentForm[data-postid="${postID}"]`)
    commentForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const content = this.querySelector('textarea').value
        submitComment(postID, content)
    })
}

document.addEventListener('submit', function (e) {
    if (e.target.classList.contains('commentForm')) {
        e.preventDefault()
        const postID = e.target.getAttribute('data-postid')
        const content = e.target.querySelector('textarea').value

        fetch('comment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postID: postID, content: content, username: username }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    loadComments(postID)
                    e.target.querySelector('textarea').value = ''
                } else {
                    alert(data.message)
                }
            })
    }
})

function loadPosts() {
    fetch('post.php')
        .then((response) => response.json())
        .then((data) => {
            const postsContainer = document.getElementById('postsContainer')
            postsContainer.innerHTML = ''
            data.posts.forEach((post) => {
                const postDiv = document.createElement('div')
                postDiv.className = 'post'
                postDiv.setAttribute('data-postid', post.PostID)
                postDiv.innerHTML = `
                <h3>${post.Title}</h3>
                <p>${post.Content}</p>
                <div class="reaction-buttons">
                    <button class="like-button">Like</button>
                    <span class="likes-count">${post.LikesCount}</span>
                    <button class="dislike-button">Dislike</button>
                    <span class="dislikes-count">${post.DislikesCount}</span>
                </div>
                <small>Posted by: ${post.Username} on ${post.Timestamp}</small>
                <div class="comments">
                    <h4>Comments</h4>
                    <div class="commentsContainer" data-postid="${post.PostID}"></div>
                    <form class="commentForm" data-postid="${post.PostID}">
                        <textarea placeholder="Write a comment..." required></textarea><br>
                        <button type="submit">Comment</button>
                    </form>
                </div>
            `
                postsContainer.appendChild(postDiv)
                loadComments(post.PostID)
            })
        })
}

function handleReaction(id, reactionType) {
    fetch('reactions.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postID: id, reactionType: reactionType, username: username }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                loadPosts()
            } else {
                alert(data.message)
            }
        })
}

loadPosts()
