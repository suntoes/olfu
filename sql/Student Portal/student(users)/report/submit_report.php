<?php
    session_start();

    if (!isset($_SESSION['email'])) {
        header("Location: login.html");
        exit();
    }

    $email = $_SESSION['email'];

    $conn = new mysqli("localhost", "root", "", "student_portal");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $type = $_POST['type'];
    $description = $_POST['description'];
    $submission_date = date('Y-m-d H:i:s');

    $sql = "INSERT INTO reports (report_type, description, submission_date) VALUES ('$type', '$description', '$submission_date')";

    if ($conn->query($sql) === TRUE) {
        header("Location: report.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>