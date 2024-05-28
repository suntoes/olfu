<?php
    session_start();

    $conn = new mysqli("localhost", "root", "", "student_portal");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = $_SESSION['email'];

    $sql = "SELECT * FROM student_profiles WHERE Student_ID = (SELECT Student_ID FROM student_users WHERE email = '$email')";
    $result = $conn->query($sql);

    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($data);
?>
