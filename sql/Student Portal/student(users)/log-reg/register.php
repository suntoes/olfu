<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $stdnum = $_POST['stdnum'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $conn = new mysqli("localhost", "root", "", "student_portal");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO student_users (Student_ID, Email, `Password`) VALUES ('$stdnum', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        header("Location: ../profile-reg/profreg.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
