<?php
    session_start();
    $conn = new mysqli("localhost", "root", "", "student_portal");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
        $postID = $data['postID'];
        $content = $data['content'];
        $username = $data['username'];

        $sql = "INSERT INTO comments (PostID, Username, CommentContent) VALUES ('$postID', '$username', '$content')";
        if ($conn->query($sql) === TRUE) {
            $commentID = $conn->insert_id;
            $comment = ["CommentID" => $commentID, "PostID" => $postID, "Username" => $username, "CommentContent" => $content, "Timestamp" => date("Y-m-d H:i:s")];
            echo json_encode(["success" => true, "comment" => $comment]);
        } else {
            echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
        }
        exit();
    }

    $postID = $_GET['postID'];
    $sql = "SELECT * FROM comments WHERE PostID = '$postID' ORDER BY Timestamp ASC";
    $result = $conn->query($sql);
    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
    echo json_encode(["success" => true, "comments" => $comments]);
?>
