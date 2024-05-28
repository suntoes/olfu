<?php
    session_start();
    if (!isset($_SESSION['email'])) {
        header("Location: login.php");
        exit();
    }

    $conn = new mysqli("localhost", "root", "", "student_portal");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = $_SESSION['email'];
    $sql = "SELECT Username FROM student_profiles sp
            JOIN student_users su ON sp.Student_ID = su.Student_ID
            WHERE su.Email = '$email'";
    $result = $conn->query($sql);
    $user = $result->fetch_assoc();
    $username = $user['Username'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forum</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to the Forum</h1>
        <div class="post-form">
            <h2>Create a Post</h2>
            <form id="postForm">
                <input type="text" id="title" name="title" placeholder="Title" required><br>
                <textarea id="content" name="content" placeholder="Write your post here..." required></textarea><br>
                <button type="submit">Post</button>
            </form>
        </div>
        <div class="posts">
            <h2>Posts</h2>
            <div id="postsContainer"></div>
        </div>
    </div>
    <script>
        const username = "<?php echo $username; ?>";
    </script>
    <script src="script.js"></script>
</body>
</html>
