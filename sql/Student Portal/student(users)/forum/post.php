<?php
    session_start();
    $conn = new mysqli("localhost", "root", "", "student_portal");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'];
        $content = $data['content'];
        $username = $data['username'];

        $sql = "INSERT INTO posts (Username, Title, Content) VALUES ('$username', '$title', '$content')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
        }
        exit();
    }

    $sql = "SELECT * FROM posts ORDER BY Timestamp DESC";
    $result = $conn->query($sql);
    $posts = [];
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    echo json_encode(["posts" => $posts]);
?>
